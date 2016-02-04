# Game Engine

This is a mini game engine modeled after a number of libraries and engines, mainly Three.js, Unity, and Game Maker Studio.

to use this game engine, just do this:

```javascript


```

alternatively, if you want autocomplete to help you out:

```javascript
import * as Engine from './lib/engine';

//Now do `Engine.whatever` and you'll find a bunch of stuff.

var renderer = new Engine.Renderer();
```

This is discouraged in a production app since this may import things you're not using like niche functions in the Math library, but obviously this is way easier.
