# scaled-fractal

Fractal based design pattern for large scaled applications with many teams.

## Structure objective

The goal here was to create a structure where we don't have so much dependency coupling that would otherwise stop one part of a web application to upgrade without also upgrading the rest of the site all in one go.

The mono-repo structure uses yarn workspaces to achieve this. This allows us to separate our project into separate npm packages thus allowing each module to be independent in it's dependencies while also being in the same repo to allow for quick code enhancements.

The disadvantage of mono-repo packages would be that they're version agnostic to their sibling packages. Forunately this is not a concern to our modules since any updates we make to a module in the mono-repo should be applied immediately to the main site.

## Structure outline

Below is a basic representation of the root project structure. `frame` will be the starting point, which will do nothing more than simply pulling in `redux` and `react` and starting the connection to render the initial site, whereas `packages` is the root for mono-repo packages, this will help with splitting our concerns, and we'll get into why that's the case a bit later.

```
www-tab -
         |- frame
         |- packages
         |- public
         |.eslintrc
         |babel.config.js
         |jest.config.js
         |package.json
         |yarn.lock
         |...
```

## The main development directories

### `frame`
This will serve as the entry point for the site, where major integration points with the site gets instantiated. Think of it as anything that must be single instance or have it's single instance created, will live here.

```
src -
     |App.js
     |index.js
     |...
```

Once this the site has been around for a while. We should see very little changes to this area unless the site has a requirement to add a structural layer that didn't previously exist such as a footer.

`index.js` - This will be the entry point for the react rendering as well as everything else for our mono-repo project. At this point the code would make the initial render, and bolt everything else together.

### `packages/views`
This is where all the parts of the ui are located.

```
modules -
         |- MenuBar
         |- Body
         |- Footer
         |- Header
         |- SearchBar
         |- ...
```

In the `src`'s `App` component it will create an initial structure that will render one or more of the modules, which then would cascade into other modules. Such as the SearchBar living inside the Header. The Body may consist of MenuBar and the Footer. And later, if we receive a requirement that the same SearchBar needs to be inside the MenuBar, the MenuBar can import the SearchBar module and render it where ever it pleases.

Logic or state of a module can be shared through dispatching redux actions that can be used to either store data for other parts of the application to access or, to alert other modules of something occurring. Though it's important to note that usage of redux actions/store doesn't have to only be used when communicating with other modules, but can also be used to reduce overhead logic of the current module or store some state for future regeneration.

A standard we must maintain is that a parent module cannot under any circumstance, pass props from one module to another. The reasoning for this is that modules should have the capability to be reused anywhere in the site. For example, a Deposit component that connects to the store to retrieve credit card information should be able to render anywhere in the site and still maintain it's functionality. In this way, the module is truly decoupled, and the maintainers of Deposit and it's parent can be maintained by two different teams, yet still be fully autonomous, the parent module is responsible for where the Deposit would render, whereas the functionality of it, is handled by the Deposit itself. 

When a module wants to render a child module, we want to make sure that we keep a consistent means of passing through data. Because we rely on the redux store being passed through the react tree, though the maintainers of each module are free to use whatever view library they choose, we must make sure we maintain a standard interface of initially rendering a react component that accepts the store and renders a react child as a new module, passing through the store we accepted from our parent.

If you were to break the react chain, because you wanted to render vue for example, then you may have to write code like the following:

```js
// ModuleA/index.js
import React from 'react';
import someVueCode from './someVueCode';

const ModuleA = (props, { store }) => (
  <div>
    {someVueCode(store)}
  </div>
)

export default ModuleA

// ModuleA/someVueCode.js
import Vue from 'vue';
import ModuleB from '@tabdigital/ModuleB';

export default store => (
  const Component = // some kind of vue logic;

  return (
    Component({
      child: (
        <Provider
          store={store}
        >
          <ModuleB />
        </Provider>
    })
  );
)
```

As you can see we utilise the context to grab a reference to the store, this is an important point, as we should be quite confident in using react and even more confident in react and all it's advanced functionality if we want to start rendering with a different engine. Doing something like this should be a last resort when we want to move to a new framework, but it's at least nice to know we have that option.

As you can see from above, it is highly encouraged that you do whatever you please, code how ever you like with whatever code standards you like, within the context of your module.
State management is up to what your team prefers, you don't need to always make use of the redux store. Maintaining a modules internal store has a few benefits where you don't bleed data globally when only your module cares about it, and the module can be cleaned up easily if the feature is no longer required. Feel free to use setState, context, unstated, or whatever else you think fits the needs of the module.

In relation to code standards within a module, feel free to override the top level .eslintrc. Don't use semi colons, use double quotes to declare strings, whatever you like think is best.
By doing this, code standards don't belong to the coperation, but instead the team maintaining the module. Though we must be careful to enforce a common code standard if changes occur to the reusable areas, such as `frame` or `@core/reducers`.

---

The rules of when a piece of the application should be split into another module are not hard and fast, it really depends. When a part of an app can really live on it's own and doesn't require logic from the parent, perhaps you should split it, maybe when one part is becoming too complicated and extending that part might require a rewrite in the future, it may be a good indication to split it so that when the rewrite occurs, it won't be breaking the rest of the site.
Though on the other end of the spectrum, don't feel the need to create as many modules as possible just for the sake of it, do it case by case, whenever it seems reasonable to do so.

### `packages/pkgs`
This simply holds useful or reusable functionality across the site. Notice that I have defined inside a packaged called `root-dom-tag`, which does nothing more than carry a variable to ensure all packages reference the same dom node if they were to use ReactDOM.render or portal functions.

### `packages/core`
This is where business logic and domain logic will go, reducers to handle client-side state management and the service to make outward http requests confined to one area.

## Dependency management
When developing a scaled application with many independent pieces we must be conscious and ensure that all packages are using the same version of major dependencies.

To accomplish this, notice how the `@views/menu` module in, `modules/Menu` does not have any dependencies, yet the embedded JavaScript files are freely importing dependencies such as `react` and `react-redux`. This is accomplished by the way yarn workspaces works. All dependencies are consolidated into a single `node_modules` and therefore any package in the project can import it. This is especially important with packages such as `react`, where all components in the react tree must use the same version, as well as helping to maintain a stable bundle that doesn't unintentionally duplicate packages.

Though we want unified packages across the project, a child package doesn't necessarily have to be locked to the same version as the workspace. If you note `@views/header` and `@views/main`, these two packages use `lodash`, different versions, as well as the workspace not depending on lodash at all. Giving child packages the flexibility to choose their own dependency for non-critical dependencies enables mono-repo packages to upgrade incrementally, which avoids many teams coordinating big bang commits often.

## Style library
The choice of a styling libraries has a few considerations. First it must scale, what this means is that, I should be able to define a set of brand attributes such as color in one location and have that cascade easily through the site.

Because of this consideration, JavaScript defined css seems like the most appropriate solution. It's the current trend as of writing this, and for good reason. It allows for more programmatic styles as well being able to be defined as a simple JavaScript object that can be passed through a site.

For the sake of this project I have opted for `aphrodite` as that is my styling library of choice.
This is my preference as it mimics the simple api of standard inline styles which gives it a simple learning curve, while being injected as `<style />` blocks to be performant as well as exposing powerful css functionality that usually isn't possible with JavaScript defined css such as :hover/animations/etc.
Though you could replace it with whatever you prefer.

Although I had selected `aphrodite`, the usage of JavaScript defined css will give individual modules and teams more flexibility. The project leads may enforce a general usage of one style library, but if a team wished to experiment with another they are free to while still guaranteeing an alignment with the the site's overall user experience.

## Tutorial

To add a workspace dependency, run the following in the root dir

```
yarn workspace [workspace] add [packageName]@1.0.0
```
