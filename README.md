[![npm](https://img.shields.io/npm/v/@yummies/yummies.svg?style=flat-square)](https://www.npmjs.com/package/@yummies/yummies)
[![travis](http://img.shields.io/travis/yummies/yummies.svg?style=flat-square)](https://travis-ci.org/yummies/yummies)
[![coverage](http://img.shields.io/coveralls/yummies/yummies/master.svg?style=flat-square)](https://coveralls.io/r/yummies/yummies)
[![deps](http://img.shields.io/david/yummies/yummies.svg?style=flat-square)](https://david-dm.org/yummies/yummies)
[![gitter](http://img.shields.io/badge/gitter-join_chat-brightgreen.svg?style=flat-square)](https://gitter.im/yummies/yummies)

## Install

```
npm i -S @yummies/yummies
```

## Overview

Like [BEM methodology](https://en.bem.info/method/definitions/) and using [React](https://facebook.github.io/react/)? How about that:

```js
import Yummies from '@yummies/yummies';

class MyComponent extends Yummies.Component {
    constructor() {
        this.state = {
            test: null
        };
    }

    render() {
        return {
            block: 'my-component',
            mods: {
                test: this.state.test
            },
            content: {
                elem: 'input',
                tag: 'input',
                mods: {
                    type: 'search'
                },
                mix: {
                    block: 'my-another-component',
                    elem: 'input'
                },
                props: {
                    placeholder: 'search'
                }
            }
        };
    }
}

const MyComponentFactory = Yummies.createFactory(MyComponent);

Yummies.render(MyComponentFactory(), document.body);
```

## BEM

Similar to [BEMJSON](https://en.bem.info/technology/bemjson/v2/bemjson/):

##### `block <string>`

[Block](https://en.bem.info/method/definitions/#block) name.

##### `elem <string>`

[Element](https://en.bem.info/method/definitions/#element) name. Understands current block context so no need to repeat `block` inside nested elements.

##### `mods <object>`

* `block` + `mods` – [block modifiers](https://en.bem.info/method/definitions/#modifiers-for-blocks)
* `elem` + `mods` – [element modifiers](https://en.bem.info/method/definitions/#element-modifiers)

Can be shorthanded with `true` as modifier value.

##### `mix <array|object>`

[Mix](https://en.bem.info/forum/issues/4/) additional className(s) from another BEM entity(ies).

##### `tag <string>`

HTML tag, `div` by default.

##### `content <*>`

Any possible content such as strings, arrays, BEMJSON, React Elements, …

## Inheritance

Already knows about [BEM Levels of definition](https://en.bem.info/method/filesystem/#levels-of-definition)? Good, because we have it as "Layers" – checkout [babel-plugin-yummies](https://github.com/yummies/babel-plugin-yummies) – multilayer components inheritance for Yummies.

## API

### Patched methods

The following [React Top-Level API](https://facebook.github.io/react/docs/top-level-api.html) methods are patched to support the new format:

##### `render()`

```js
Yummies.render({ block: 'my-component' }, document.body);
```

##### `renderToString()`

```js
Yummies.renderToString({ block: 'my-component' });
```

##### `renderToStaticMarkup()`

```js
Yummies.renderToStaticMarkup({ block: 'my-component' });
```

##### `createElement()`

```js
Yummies.createElement({ block: 'my-component' });
```

```js
Yummies.createElement(class extends Yummies.Component { … });
```

##### `createFactory()`

```js
Yummies.createFactory(class extends Yummies.Component { … });
```

### Additional helpers

#### `yummify(<class>)`
Patch class (extended from `Yummies.Component`) `render()` method to support BEMJSON.

##### `buildClassName(<object>)`

Build className string from BEMJSON object.

```js
Yummies.buildClassName({ block: 'my-component', elem: 'title' });
```

##### `yummifyChain(<array>)`

Collect all the inherited classes chain and return a ReactElement Factory.
See [babel-plugin-yummies](https://github.com/yummies/babel-plugin-yummies) for more details.

```js
Yummies.yummify([ … ]);
```

##### `yummifyChainRaw(<array>)`

Collect all the inherited classes chain and return a resulted Class Factory.
See [babel-plugin-yummies](https://github.com/yummies/babel-plugin-yummies) for more details.

```js
Yummies.yummifyRaw([ … ]);
```
