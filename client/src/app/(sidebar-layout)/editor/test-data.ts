export const gravityPlatformer = `import pygame
import sys

# Initialize Pygame
pygame.init()

# Screen dimensions
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600

# Colors for different planets
PLANET_COLORS = {
    'Earth': (135, 206, 235),      # Sky Blue
    'Mars': (188, 39, 50),         # Mars Red
    'Moon': (169, 169, 169),       # Dark Gray
    'Jupiter': (255, 165, 0),      # Orange
}

# Gravity settings for each planet
PLANET_GRAVITY = {
    'Earth': 0.5,
    'Mars': 0.3,
    'Moon': 0.1,
    'Jupiter': 0.8,
}

# Define Planet zones
PLANET_ZONES = [
    {'name': 'Earth', 'start': 0, 'end': 800},
    {'name': 'Mars', 'start': 800, 'end': 1600},
    {'name': 'Moon', 'start': 1600, 'end': 2400},
    {'name': 'Jupiter', 'start': 2400, 'end': 3200},
]

# Set up the display
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Gravity Adventure")

# Clock for controlling frame rate
clock = pygame.time.Clock()
FPS = 60

# Define the Player class
class Player(pygame.sprite.Sprite):
    def __init__(self, x, y):
        super().__init__()
        self.width = 50
        self.height = 60
        self.image = pygame.Surface((self.width, self.height))
        self.image.fill((255, 215, 0))  # Gold color
        self.rect = self.image.get_rect()
        self.rect.topleft = (x, y)
        self.vel_x = 0
        self.vel_y = 0
        self.speed = 5
        self.jump_strength = 10
        self.on_ground = False
        self.gravity = PLANET_GRAVITY['Earth']

    def update(self, platforms, current_gravity):
        keys = pygame.key.get_pressed()
        self.vel_x = 0
        if keys[pygame.K_a]:
            self.vel_x = -self.speed
        if keys[pygame.K_d]:
            self.vel_x = self.speed
        if keys[pygame.K_w] and self.on_ground:
            self.vel_y = -self.jump_strength

        # Apply gravity
        self.vel_y += current_gravity
        if self.vel_y > 10:  # Terminal velocity
            self.vel_y = 10

        # Move horizontally
        self.rect.x += self.vel_x

        # Check horizontal collisions
        for platform in platforms:
            if self.rect.colliderect(platform.rect):
                if self.vel_x > 0:
                    self.rect.right = platform.rect.left
                elif self.vel_x < 0:
                    self.rect.left = platform.rect.right

        # Move vertically
        self.rect.y += self.vel_y

        # Check vertical collisions
        self.on_ground = False
        for platform in platforms:
            if self.rect.colliderect(platform.rect):
                if self.vel_y > 0:
                    self.rect.bottom = platform.rect.top
                    self.vel_y = 0
                    self.on_ground = True
                elif self.vel_y < 0:
                    self.rect.top = platform.rect.bottom
                    self.vel_y = 0

    def draw(self, surface, camera_x):
        surface.blit(self.image, (self.rect.x - camera_x, self.rect.y))

# Define the Platform class
class Platform(pygame.sprite.Sprite):
    def __init__(self, x, y, width, height):
        super().__init__()
        self.image = pygame.Surface((width, height))
        self.image.fill((34, 139, 34))  # Forest Green
        self.rect = self.image.get_rect()
        self.rect.topleft = (x, y)

    def draw(self, surface, camera_x):
        surface.blit(self.image, (self.rect.x - camera_x, self.rect.y))

# Define the Game class
class Game:
    def __init__(self):
        self.player = Player(100, SCREEN_HEIGHT - 150)
        self.platforms = pygame.sprite.Group()
        self.create_platforms()
        self.camera_x = 0
        self.current_planet = 'Earth'

    def create_platforms(self):
        # Ground platforms for each planet
        for zone in PLANET_ZONES:
            # Create a ground platform for each planet zone
            platform = Platform(zone['start'], SCREEN_HEIGHT - 100, zone['end'] - zone['start'], 100)
            self.platforms.add(platform)
            # Add some floating platforms
            for i in range(5):
                plat_x = zone['start'] + 150 * (i + 1)
                plat_y = SCREEN_HEIGHT - 200 - (i * 30)
                floating = Platform(plat_x, plat_y, 100, 20)
                self.platforms.add(floating)

    def get_current_planet(self):
        player_center_x = self.player.rect.centerx + self.camera_x
        for zone in PLANET_ZONES:
            if zone['start'] <= player_center_x < zone['end']:
                return zone['name']
        return 'Earth'

    def run(self):
        running = True
        while running:
            clock.tick(FPS)
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False

            # Update current planet based on player position
            self.current_planet = self.get_current_planet()
            current_gravity = PLANET_GRAVITY[self.current_planet]

            # Update player
            self.player.update(self.platforms, current_gravity)

            # Update camera to follow player
            self.camera_x = self.player.rect.x - 100
            if self.camera_x < 0:
                self.camera_x = 0
            elif self.camera_x > 3200 - SCREEN_WIDTH:
                self.camera_x = 3200 - SCREEN_WIDTH

            # Draw background based on current planet
            screen.fill(PLANET_COLORS[self.current_planet])

            # Draw platforms
            for platform in self.platforms:
                if self.camera_x - 100 < platform.rect.x < self.camera_x + SCREEN_WIDTH + 100:
                    platform.draw(screen, self.camera_x)

            # Draw player
            self.player.draw(screen, self.camera_x)

            # Display current planet name
            self.display_text(f"Planet: {self.current_planet}", 30, (255, 255, 255), 10, 10)

            pygame.display.flip()

        pygame.quit()
        sys.exit()

    def display_text(self, text, size, color, x, y):
        font = pygame.font.SysFont(None, size)
        img = font.render(text, True, color)
        screen.blit(img, (x, y))

# Run the game
if __name__ == "__main__":
    game = Game()
    game.run()
`;
