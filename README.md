[![npm](https://img.shields.io/npm/v/@yummies/bem.svg?style=flat-square)](https://www.npmjs.com/package/@yummies/bem)
[![travis](http://img.shields.io/travis/yummies/bem.svg?style=flat-square)](https://travis-ci.org/yummies/bem)
[![coverage](https://img.shields.io/codecov/c/github/yummies/bem.svg?style=flat-square)](https://codecov.io/github/yummies/bem)
[![deps](https://img.shields.io/gemnasium/yummies/bem.svg?style=flat-square)](https://gemnasium.com/yummies/bem)

## Install

```
npm i -S @yummies/bem
```

## Overview

Like [BEM methodology](https://en.bem.info/method/definitions/) and using [React](https://facebook.github.io/react/)? Give `@yummies/bem` a try:

```js
import { Component } from 'react';
import { render } from 'react-dom';
import BEM from '@yummies/bem';

class BeepClass extends Component {
    render() {
        return BEM({
            block: 'beep',
            tag: 'span',
            mods: {
                type: 'simple',
                ...this.props.mods
            },
            mix: this.props.mix,
            props: this.props,
            content: this.props.children
        });
    }
}

const Beep = React.createFactory(BeepClass);

class BoopClass extends Component {
    render() {
        return BEM({
            block: 'boop',
            mods: this.props.mods,
            mix: this.props.mix,
            props: this.props,
            content: [
                Beep({
                    mix: {
                        block: 'boop',
                        elem: 'oh'
                    },
                    mods: {
                        size: 'xl'
                    }
                }, 'oh'),
                {
                    elem: 'hello',
                    content: 'hello'
                }
            ]
        });
    }
}

const Boop = React.createFactory(BoopClass);

render(Boop({ disabled: true }), document.body);
```

```html
<div class="boop boop_disabled">
    <span class="beep beep_type_simple beep_size_xl boop__oh">oh</div>
    <div class="boop__hello">hello</div>
</div>
```

## `BEM()`

`BEM()` converts `bemjson` into [React Element](https://facebook.github.io/react/blog/2014/10/14/introducing-react-elements.html). Anything except arrays and plain objects will be returned as is, which means that you can use any mixed content including another React Elements as well.

## `bemjson`

### `block`

[Reference](https://en.bem.info/method/key-concepts/#block).

```js
BEM({
    block: 'beep'
})
```

```html
<div class="beep"></div>
```

### `elem`

[Reference](https://en.bem.info/method/key-concepts/#element).

```js
BEM({
    block: 'beep',
    elem: 'boop'
})
```

```html
<div class="beep__boop"></div>
```

### `mods`

[Reference](https://en.bem.info/method/key-concepts/#modifier).

#### Simple

```js
BEM({
    block: 'beep',
    mods: {
        foo: 'bar'
    }
})
```

```html
<div class="beep beep_foo_bar"></div>
```

#### Boolean

```js
BEM({
    block: 'beep',
    mods: {
        foo: true,
        bar: false
    }
})
```

```html
<div class="beep beep_foo"></div>
```

#### Element

```js
BEM({
    block: 'beep',
    elem: 'boop',
    mods: {
        foo: 'bar'
    }
})
```

```html
<div class="beep__boop beep__boop_foo_bar"></div>
```

### `mix`

[Reference](https://en.bem.info/method/key-concepts/#mix).

#### Simple

```js
BEM({
    block: 'beep',
    mix: {
        block: 'boop',
        elem: 'foo'
    }
})
```

```html
<div class="beep boop__foo"></div>
```

#### Multiple

```js
BEM({
    block: 'beep',
    mix: [
      {
          block: 'boop',
          elem: 'foo'
      },
      {
          block: 'bar',
          mods: {
              test: true
          }
      }
    ]
})
```

```html
<div class="beep boop__foo bar_test"></div>
```

### `tag`

#### Default

```js
BEM({})
```

```html
<div></div>
```

#### Custom

```js
BEM({
    tag: 'span'
})
```

```html
<span></span>
```

### `props`

Will be transfered as [React Props](https://facebook.github.io/react/docs/transferring-props.html).

References:
* [HTML Attributes](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes)
* [Events System](https://facebook.github.io/react/docs/events.html)

```js
BEM({
    block: 'image',
    tag: 'img',
    props: {
        src: 'http://funkyimg.com/i/26jtf.gif',
        alt: 'kitten'
    }
})
```

```html
<img class="image" src="http://funkyimg.com/i/26jtf.gif" alt="kitten"/>
```

### `content`

Anything including arrays, nested `bemjson`, React Elements, strings, numbers, etc.

#### Simple

```js
BEM({
    block: 'beep',
    content: [
        {
            block: 'foo'
        },
        {
            block: 'bar'
        }
    ]
})
```

```html
<div class="beep">
    <div class="foo"></div>
    <div class="bar"></div>
</div>
```

#### Block context

Block context is preserved so there is no need to specify `block` every time for nested `bemjson`.

```js
BEM({
    block: 'beep',
    content: {
        elem: 'boop'
    }
})
```

```html
<div class="beep">
    <div class="beep__boop"></div>
</div>
```

## Notes

### Environment

`process.env.NODE_ENV` must be available. For example in webpack you can do this with `DefinePlugin`:

```js
plugins: [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
    })
]
```
