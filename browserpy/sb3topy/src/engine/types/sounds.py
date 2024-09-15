"""
sounds.py

Contains the Sounds class.

TODO Consider using properties for the Sounds class.
"""

__all__ = ['Sounds']


import asyncio

import pygame as pg

import sys
if sys.platform == 'emscripten':
    try:
        pg.mixer.SoundPatch()
    except:
        pass


class Sounds:
    """
    Handles sounds for a target

    Attributes:
        sounds: A dict referencing sounds (pg.mixer.Sound) by name

        sounds_list: Used to reference sounds by number

        volume: The current volume. If set directly, currently playing
            channels will not update. Use set_volume to update them.

        effects: A dict containing current sound effects

        _channels: A dict with sound channels as keys and waiting tasks
            as values. The channels are kept so the volume can be
            adjusted and the tasks are there to be cancelled.

    Class Attributes
        _cache: A shared dict containing md5ext / Sound pairs

        _all_sounds: Contains all sound tasks ready for cancellation
    """

    _cache = {}
    _all_sounds = {}

    def __init__(self, volume, sounds, copy_dict=None):
        if copy_dict is None:
            self.sounds = {}
            self.sounds_list = []

            for asset in sounds:
                self.sounds[asset['name']] = self._load_sound(asset['path'])
                self.sounds_list.append(self.sounds[asset['name']])
        else:
            self.sounds = copy_dict
            self.sounds_list = sounds

        self.volume = volume
        self.effects = {}
        self._channels = {}

    def _load_sound(self, path):
        """Load a sound or retrieve it from cache"""
        return None
        # sound = self._cache.get(path)
        # if isinstance(sound, type(None)):
        #     sound = pg.mixer.Sound("assets/" + path)
        #     self._cache[path] = sound
        # return sound

    def set_volume(self, volume):
        """Sets the volume and updates it for playing sounds"""
        self.volume = max(0, min(100, volume))
        self._update_volume()

    def change_volume(self, volume):
        """Changes and updates the volume by an amount"""
        self.set_volume(self.volume + volume)

    def _update_volume(self):
        """Updates the volume for every channel"""
        lvol, rvol = self._get_volume()
        for channel in self._channels:
            channel.set_volume(lvol, rvol)

    def _get_volume(self):
        """Gets the left and right volume levels"""
        pan = self.effects.get("pan", 0)
        return (max(0, min(100, self.volume - pan)) / 100,
                max(0, min(100, self.volume + pan)) / 100)

    def play(self, name):
        """Plays the sound and returns an awaitable."""
        # Get the sound from name or number
        sound = self.sounds.get(name)
        if isinstance(sound, type(None)):
            try:
                name = round(float(name)) - 1
                if 0 < name < len(self.sounds_list):
                    sound = self.sounds_list[name]
                else:
                    sound = self.sounds_list[0]
            except ValueError:
                pass
            except OverflowError:  # round(Infinity)
                pass

        # Play the sound
        if not isinstance(sound, type(None)):
            # Stop the sound if it is already playing
            for channel, task in self._channels.items():
                if channel.get_sound == sound:
                    channel.stop()
                    task.cancel()

            # Try to play it on an open channel
            channel = pg.mixer.find_channel()
            if channel:
                return asyncio.create_task(
                    self._handle_channel(sound, channel))
        return asyncio.create_task(asyncio.sleep(0))

    async def _handle_channel(self, sound, channel):
        """Saves the channel and waits for it to finish"""
        # Start the sound
        if not isinstance(sound, type(None)): 
            delay = 0
            if not isinstance(sound.get_length, type(None)): 
                delay = sound.get_length()
                channel.set_volume(*self._get_volume())
                channel.play(sound)

                # Create a cancelable waiting task
                task = asyncio.create_task(asyncio.sleep(delay))
                self._channels[channel] = task
                self._all_sounds[channel] = task

                # Pop the channel once it is done or cancelled
                await asyncio.wait((task,))
                self._channels.pop(channel)
                self._all_sounds.pop(channel)
            elif not isinstance(sound.media, type(None)):  # BROWSER
            
                # Stop any currently playing media on this channel
                if channel in self._channels:
                    previous_sound = self._channels[channel]
                    if hasattr(previous_sound, 'media') and not previous_sound.media.ended:
                        previous_sound.media.pause()
                        previous_sound.media.currentTime = 0  # Reset playback to the start

                # Play the new sound
                sound.media.play()

                # Create a future that resolves when the sound finishes
                future = self._create_media_future_BROWSER_ONLY(sound.media)
                self._channels[channel] = future
                self._all_sounds[channel] = future

                # Wait for the future to resolve
                await asyncio.wait((future,))
                self._channels.pop(channel)
                self._all_sounds.pop(channel)

    def _create_media_future_BROWSER_ONLY(self, media):
        """Creates an asyncio.Future that resolves when the media finishes"""
        future = asyncio.get_event_loop().create_future()

        # Use a periodic check on the media state without relying on while sleep
        async def check_media_finished():
            while not media.ended:
                await asyncio.sleep(0.1)  # Short sleep to avoid blocking
            if not future.done():
                future.set_result(True)  # Mark the future as completed

        # Launch the checker as a background task
        asyncio.create_task(check_media_finished())
        return future

    @classmethod
    def stop_all(cls):
        """Stops all sounds for all sprites"""
        for channel, task in cls._all_sounds.items():
            task.cancel()
            channel.stop()

    def stop(self):
        """Stop all sounds for this sprite"""
        for channel, task in self._channels.items():
            task.cancel()
            channel.stop()

    def copy(self):
        """Returns a copy of this Sounds"""
        return Sounds(self.volume, self.sounds_list, self.sounds)

    def set_effect(self, effect, value):
        """Set a sound effect"""
        if effect == 'pan':
            self.effects['pan'] = max(-100, min(100, value))
            self._update_volume()

    def change_effect(self, effect, value):
        """Change a sound effect"""
        value = self.effects.get(effect, 0) + value
        self.set_effect(effect, value)

    def clear_effects(self):
        """Clear sound effects"""
        self.effects = {}
        self._update_volume()
