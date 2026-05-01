# Multiplayer Chat System

Production-ready Unreal Engine plugin for adding multiplayer chat without dragging a full demo project into your game.

## Core Features

- Global chat
- `/y` or `/yell`
- `/w PlayerName message`
- Text and animation emotes
- Replicated public history through `GameState`
- Native C++ chat HUD
- World chat bubbles with fade and occlusion
- Runtime command and player-name autocomplete with `Tab`
- Input history with `Up` and `Down`
- Visual theme system with presets, custom themes, and saved theme names
- Editor designer panel with live preview
- Blueprint node for `System` chat messages with optional sender override
- Automation tests for runtime and editor flows

## Minimal Integration

1. Download the plugin from the Epic Games Launcher or your FAB Library.
2. Select the Unreal Engine version you want to use, then download or install that plugin build.
3. Add the plugin to your target project from the Launcher library and open the project in Unreal.
4. Enable the plugin if Unreal asks for activation or restart.
5. Make your `GameState` inherit from `AChatSystemGameState`.
6. Make your `PlayerController` inherit from `AChatSystemPlayerController`.
7. Open `Project Settings -> Plugins -> Multiplayer Chat System -> Chat Integration`.
8. Use the built-in character selector to detect `Pawn` or `Character Blueprint` classes from `/Game` and enabled project plugins.
9. Press `Apply Chat To Pawn` to add `UChatComponent` and `UChatBubbleComponent` to the selected blueprint.
10. Define the character name used by the chat system so the correct speaker appears in the feed, whispers, emotes, and world bubbles.
11. Create your chat input buttons or action mappings before testing in play.
12. Bind `OpenChat` to `FocusChatInput()` and `CloseChat` to `ReleaseChatInputFocus()`.
13. Recommended default buttons: `Enter` to open or send chat, and `Escape` to close chat.
14. For scripted notices, quests, or tutorials, use the Blueprint node `Send System Chat Message`.

Use these default `DefaultInput.ini` mappings if you want the same starter setup used in the docs:

```ini
+ActionMappings=(ActionName="OpenChat",bShift=False,bCtrl=False,bAlt=False,bCmd=False,Key=Enter)
+ActionMappings=(ActionName="CloseChat",bShift=False,bCtrl=False,bAlt=False,bCmd=False,Key=Escape)
```

## Character Name Integration

- After applying chat to a pawn, make sure the player-facing character name is configured as part of that pawn setup.
- That speaker identity is what the plugin shows in the chat feed, whisper targets, emotes, autocomplete, connected player lists, and world bubbles.
- If you are using multiple demo or NPC-style characters, set those names intentionally before recording screenshots or shipping a showcase level.

## Blueprint System Messages

Version `1.0.1` adds a global Blueprint node named `Send System Chat Message`.

Use it when you want to push non-player chat entries such as:

- quest updates
- tutorial prompts
- NPC or announcer lines
- scripted notifications

Inputs:

- `WorldContextObject`
- `MessageText`
- `SenderNameOverride`
- `OptionalController`

Typical example:

```text
MessageText = "Quest started"
SenderNameOverride = "Quest Guide"
OptionalController = empty for local player
```

The node resolves the active player context automatically when called from a `PlayerController`, `Character`, `Pawn`, actor, or actor component.

## Chat Commands

- `/help`, `/?`, `/commands`
- `/g`, `/global`
- `/s`, `/say`
- `/y`, `/yell`
- `/w`, `/whisper`

## HUD Themes And Designer

- The HUD supports built-in presets plus a `Custom` mode.
- Change the active theme in `Project Settings -> Plugins -> Multiplayer Chat System -> Chat HUD -> Theme`.
- Use `Save Theme` to store the current visual setup under any name.
- Open `Window -> Multiplayer Chat Designer` for a larger editing workspace with live preview.
- Switch `PositioningMode` to `Anchors` to place feed and input areas with custom anchor presets, offsets, and sizes.
- Import your own frame PNG from the designer or point `CustomThemeFrameFile` to a specific image.
- Adjust scale, typography, opacities, spacing, message style, and layout without touching code.

## Runtime Input Behavior

In `Project Settings -> Plugins -> Multiplayer Chat System -> Chat HUD -> Input`, you can control:

- `OpenChatOnEnter`
- `KeepFocusAfterSend`
- `CloseChatOnEscape`
- `InputHistory`
- `Autocomplete`
- HUD animation and minimized idle behavior

At runtime:

- `Tab` autocompletes commands and player names for whispers
- `Up` and `Down` browse previously submitted text
- `Esc` exits chat mode if enabled

## Bubble Customization

The plugin includes a dedicated `Chat Bubble` settings section where you can tune:

- World scale
- Height offset
- Visible duration
- Fade duration
- Max width
- Padding
- Background color and opacity
- Corner radius
- Text colors and font sizes
- Speaker name visibility

The designer panel also includes a dedicated bubble preview mode so the in-editor preview matches the runtime world bubble more closely.

## Editor Tooling

- Character auto-detection for playable pawns
- Explicit `Apply Chat To Pawn` and `Remove Chat From Pawn` actions
- Settings are locked during `Play In Editor` and `Simulate` to avoid unsafe edits
- Live preview for both chat HUD and chat bubble styling

## Included Tests

Automation coverage includes:

- Public message history authority and replay flow
- Whisper resolution, including ambiguous targets
- Local timestamp formatting
- System sender override
- Initial live-message delivery behavior
- Editor component apply/remove flows

## Sample Project Notes

This repository still keeps sample gameplay code in the `Multiplayer` module for reference, but the reusable system lives inside this plugin.

## FAB Publishing Notes

- The plugin metadata is authored as `EosSpirit`.
- The current plugin target is Unreal Engine `5.7`.
- The current documented release is `1.0.1`.
- For FAB packaging, distribute source-only content and exclude `Binaries`, `Intermediate`, and version-control folders from the final archive.
- Marketplace listing copy, categories, tags, and submission notes are prepared under `Docs/FAB/`.
