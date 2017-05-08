[![maintenance](https://img.shields.io/badge/maintained-no-red.svg?style=flat-square)](http://unmaintained.tech)
[![npm](https://img.shields.io/npm/v/rebem.svg?style=flat-square)](https://www.npmjs.com/package/rebem)
[![travis](http://img.shields.io/travis/rebem/rebem.svg?style=flat-square)](https://travis-ci.org/rebem/rebem)
[![coverage](https://img.shields.io/codecov/c/github/rebem/rebem.svg?style=flat-square)](https://codecov.io/github/rebem/rebem)
[![deps](https://img.shields.io/gemnasium/rebem/rebem.svg?style=flat-square)](https://gemnasium.com/rebem/rebem)
[![gitter](https://img.shields.io/badge/gitter-join_chat_%E2%86%92-46bc99.svg?style=flat-square)](https://gitter.im/rebem/rebem)

[React](https://facebook.github.io/react/) :heart: [BEM](http://getbem.com/).

## Overview

There are two ways to use `rebem` — with jsx ([a separate babel plugin](https://github.com/rebem/rebem-jsx)) and without it (out of the box), like this:

```js
import { Component } from 'react';
import { render } from 'react-dom';
import { BEM } from 'rebem';

class BeepClass extends Component {
    render() {
        return BEM(
            {
                ...this.props,
                block: 'beep',
                tag: 'span',
                mods: {
                    type: 'simple',
                    ...this.props.mods
                }
            },
            this.props.children
        );
    }
}

const Beep = React.createFactory(BeepClass);

class BoopClass extends Component {
    render() {
        return BEM(
            {
                ...this.props,
                block: 'boop'
            },
            Beep(
                {
                    mix: {
                        block: 'boop',
                        elem: 'hello'
                    },
                    mods: {
                        size: 'xl'
                    }
                },
                'hello'
            )
        );
    }
}

const Boop = React.createFactory(BoopClass);

render(
    Boop({
        mods: {
            disabled: true
        }
    }),
    document.body
);
```

```html
<div class="boop boop_disabled">
    <span class="beep beep_type_simple beep_size_xl boop__hello">hello</div>
</div>
```

## Install

```
npm i -S rebem
```

## Usage

```js
BEM(props, ...children)
```

is almost the same as

```js
React.createElement(tag/ReactClass, props, ...children)
```

but `tag` and `props.className` are made from special props:

### BEM PropTypes

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
            elem: 'baz',
            mods: {
                test: true
            }
        }
    ]
})
```

```html
<div class="beep boop__foo bar__baz bar__baz_test"></div>
```

### `tag`

`div` by default.

```js
BEM({
    tag: 'span'
})
```

```html
<span></span>
```

### `className`

If className is specified, it will be preserved along with BEM classNames.

```js
BEM({
    block: 'boop',
    className: 'beep'
})
```

```html
<div class="boop beep"></div>
```

### blockFactory

`blockFactory` can save you a couple of bytes when you have a lot of BEM-entities in the component:

```js
import React from 'react';
import { render } from 'react-dom';
import { blockFactory } from 'rebem';

const Block = blockFactory('beep');

class Beep extends React.Component {
  render() {
    return Block(this.props,
      Block({ elem: 'hello', mods: { size: 'xl' } },
        'hello'
      ),
      Block({ elem: 'jack', mix: { block: 'man' } },
        'Jack'
      )
    );
  }
}

render(
  React.createElement(Beep),
  document.body
);

```

```html
<div class="beep">
  <div class="beep__hello beep__hello_size_xl">hello</div>
  <div class="beep__jack man">hello</div>
</div>
```

### React PropTypes

References:
* [HTML Attributes](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes)
* [Events System](https://facebook.github.io/react/docs/events.html)

```js
BEM({
    block: 'image',
    tag: 'img',
    src: 'http://funkyimg.com/i/26jtf.gif',
    alt: 'kitten'
})
```

```html
<img class="image" src="http://funkyimg.com/i/26jtf.gif" alt="kitten"/>
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
