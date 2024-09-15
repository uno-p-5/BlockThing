"""
block_events.py

Contains decorators used to bind functions to events

TODO Clean up event names
"""
from functools import wraps

from .types import Target

__all__ = [
    'on_green_flag', 'on_pressed', 'on_clicked',
    'on_backdrop', 'on_greater', 'on_broadcast',
    'on_clone_start', 'sprite'
]

SPRITES = {}


def sprite(name):
    """Registers a class as a sprite which should be run"""
    def decorator(cls):
        if not issubclass(cls, Target):
            raise ValueError("@sprite expects a subclass of Target.")

        cls.name = name
        SPRITES[name] = cls
        return cls
    return decorator


def on_green_flag(func):
    """Binds a function to the green flag event"""
    func.event = 'green_flag'
    return func


def on_pressed(key):
    """Binds a function to a key press event"""
    def decorator(func):
        func.event = f"key_{key}_pressed"
        return func
    return decorator


def on_clicked(func):
    """Binds a function to the sprite clicked event"""
    func.event = 'sprite_clicked'
    return func


def on_backdrop(backdrop):
    """Binds a function to a backdrop changed event"""
    def decorator(func):
        func.event = "backdrop_" + backdrop
        return func
    return decorator


# Func edited (not from og repo)
def on_greater(source, value=None):
    """Binds a function to the timer greater than event."""
    def decorator(func):
        @wraps(func)
        async def wrapper(self, util):
            while True:
                # Get timer first (prevent getting attribute and then grabbing util timer later after it updated)
                ut = util.timer()
                # Determine the comparison value
                if isinstance(value, str):
                    if "self." in value:
                        # Get the attribute from self
                        compare_value = getattr(self, value.split('.')[-1])
                    else:
                        try:
                            compare_value = float(value)
                        except:
                            compare_value = value
                else:
                    compare_value = value
                
                if compare_value is None or ut - compare_value > 0.5:
                    await func(self, util)
                await self.yield_()
        # Set the event type
        if source == 'timer':
            wrapper.event = 'green_flag'
            return wrapper
        # Default behavior
        return func
    return decorator


def on_broadcast(broadcast):
    """Binds a function to a broadcast event"""
    def decorator(func):
        func.event = 'broadcast_' + broadcast.lower()
        return func
    return decorator


def on_clone_start(func):
    """Binds a function to the clone started event"""
    func.event = 'clone_start'
    return func
