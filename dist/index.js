/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core/Component.ts":
/*!*******************************!*\
  !*** ./src/core/Component.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.Component = void 0;\nvar Class_1 = __webpack_require__(/*! ../utils/Class */ \"./src/utils/Class.ts\");\n/**\n * The base class for all components.\n */\nvar Component = /** @class */ (function () {\n    function Component() {\n    }\n    /**\n     * Get the class of this component.\n     */\n    Component.prototype.getClass = function () {\n        return Class_1.getClass(this);\n    };\n    /**\n     * Check if the component is the given class.\n     *\n     * @param componentClass The class to check.\n     */\n    Component.prototype.is = function (componentClass) {\n        return Class_1.getClass(this) === componentClass;\n    };\n    return Component;\n}());\nexports.Component = Component;\n\n\n//# sourceURL=webpack:///./src/core/Component.ts?");

/***/ }),

/***/ "./src/core/Engine.ts":
/*!****************************!*\
  !*** ./src/core/Engine.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.Engine = void 0;\nvar SystemManager_1 = __webpack_require__(/*! ./SystemManager */ \"./src/core/SystemManager.ts\");\nvar EntityManager_1 = __webpack_require__(/*! ./EntityManager */ \"./src/core/EntityManager.ts\");\nvar Engine = /** @class */ (function () {\n    /**\n     * Create a new engine, and optionally provide specific implementations of manager classes.\n     * @param entityManager The engine's entity manager instance.\n     * @param systemManager The engine's system manager instance.\n     */\n    function Engine(entityManager, systemManager) {\n        if (entityManager === void 0) { entityManager = null; }\n        if (systemManager === void 0) { systemManager = null; }\n        this.entityManager = entityManager || new EntityManager_1.EntityManager();\n        this.systemManager = systemManager || new SystemManager_1.SystemManager(this);\n    }\n    /**\n     * Handle updating all systems each tick.\n     */\n    Engine.prototype.update = function (delta) {\n        this.systemManager.update(delta);\n    };\n    return Engine;\n}());\nexports.Engine = Engine;\nexports.default = Engine;\n\n\n//# sourceURL=webpack:///./src/core/Engine.ts?");

/***/ }),

/***/ "./src/core/Entity.ts":
/*!****************************!*\
  !*** ./src/core/Entity.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.Entity = void 0;\nvar Bitset_1 = __webpack_require__(/*! ../utils/Bitset */ \"./src/utils/Bitset.ts\");\nvar UniqueId_1 = __webpack_require__(/*! ./UniqueId */ \"./src/core/UniqueId.ts\");\n/**\n * The base class for all entities.\n */\nvar Entity = /** @class */ (function () {\n    function Entity() {\n        /**\n         * The unique ID for this entity.\n         *\n         * Entities with id <= 0 are considered uninstantiated.\n         */\n        this.id = 0;\n        /**\n         * A contiguous array of all components on the entity.\n         */\n        this.components = [];\n        /**\n         * The hash of all components by class on the entity.\n         */\n        this.componentHash = {};\n        /**\n         * A bitset representation of the components on the entity.\n         */\n        this.componentBitset = new Bitset_1.Bitset();\n    }\n    /**\n     * Whether the entity has been instantiated.\n     */\n    Entity.prototype.instantiated = function () {\n        return this.id > 0;\n    };\n    /**\n     * Getter for the component bitset.\n     */\n    Entity.prototype.getComponentBitset = function () {\n        return this.componentBitset;\n    };\n    /**\n     * Get all components.\n     */\n    Entity.prototype.all = function () {\n        return this.components;\n    };\n    /**\n     * Add a component to the entity.\n     *\n     * @param component The component to add.\n     */\n    Entity.prototype.add = function (component) {\n        // TODO: Emit event\n        this.addComponent(component); // && this.engine && this.engine.XXX\n        return component;\n    };\n    /**\n     * Check whether the entity has a component of the given class.\n     *\n     * @param componentClass The component class.\n     */\n    Entity.prototype.has = function (componentClass) {\n        return this.componentBitset.test(UniqueId_1.UniqueId.forClass(componentClass).getIndex());\n    };\n    /**\n     * Retrieve the component of the given class.\n     *\n     * @param componentClass The component class.\n     */\n    Entity.prototype.get = function (componentClass) {\n        return this.getComponent(UniqueId_1.UniqueId.forClass(componentClass)) || null;\n    };\n    /**\n     * Remove the component of the given class.\n     * There will only ever be one component of a class, so no specific reference is needed.\n     *\n     * @param componentClass The class of the component to remove.\n     */\n    Entity.prototype.remove = function (componentClass) {\n        // TODO: Emit event.\n        return this.removeComponent(UniqueId_1.UniqueId.forClass(componentClass)) || null;\n    };\n    /**\n     * Internal method to handle component addition.\n     *\n     * @param component The component to add.\n     */\n    Entity.prototype.addComponent = function (component) {\n        var id = UniqueId_1.UniqueId.forInstance(component);\n        var old = this.componentHash[id.getIndex()] || null;\n        if (component === old) {\n            return false;\n        }\n        // Remove the old component first.\n        old && this.removeComponent(id);\n        // Add the component to all data structures.\n        this.componentHash[id.getIndex()] = component;\n        this.components.push(component);\n        this.componentBitset.set(id.getIndex());\n        return true;\n    };\n    /**\n     * Internal getter for components.\n     *\n     * @param componentClass The class of the component to get.\n     */\n    Entity.prototype.getComponent = function (id) {\n        return this.componentHash[id.getIndex()] || null;\n    };\n    /**\n     * Internal method to handle component removal.\n     *\n     * @param componentClass The class of the component to remove.\n     */\n    Entity.prototype.removeComponent = function (id) {\n        var component = this.getComponent(id);\n        if (component) {\n            delete this.componentHash[id.getIndex()];\n            var index = this.components.indexOf(component);\n            index !== -1 && this.components.splice(index, 1);\n            this.componentBitset.reset(id.getIndex());\n        }\n        return component || null;\n    };\n    return Entity;\n}());\nexports.Entity = Entity;\n\n\n//# sourceURL=webpack:///./src/core/Entity.ts?");

/***/ }),

/***/ "./src/core/EntityManager.ts":
/*!***********************************!*\
  !*** ./src/core/EntityManager.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.EntityManager = void 0;\nvar Entity_1 = __webpack_require__(/*! ./Entity */ \"./src/core/Entity.ts\");\nvar Class_1 = __webpack_require__(/*! ../utils/Class */ \"./src/utils/Class.ts\");\nvar EntityManager = /** @class */ (function () {\n    function EntityManager() {\n        /**\n         * The ID of the next entity to be created.\n         */\n        this.nextEntityId = 1;\n        /**\n         * A contiguous array of all entities.\n         */\n        this.entities = [];\n        /**\n         * The hash of all entities.\n         */\n        this.entityHash = new Map();\n        /**\n         * The hash of entity listeners.\n         */\n        this.entityListeners = new Map();\n    }\n    /**\n     * Get the ID of the next created entity.\n     */\n    EntityManager.prototype.acquireEntityId = function () {\n        return this.nextEntityId++;\n    };\n    /**\n     * Create a new uninstantiated entity.\n     */\n    EntityManager.prototype.createEntity = function () {\n        return new Entity_1.Entity();\n    };\n    /**\n     * Get an array of all entities.\n     */\n    EntityManager.prototype.allEntities = function () {\n        return this.entities;\n    };\n    /**\n     * Add the given entity and instantiate it.\n     *\n     * @param entity The entity to add.\n     */\n    EntityManager.prototype.addEntity = function (entity) {\n        if (entity.instantiated()) {\n            throw new Error('Entity is already instantiated.');\n        }\n        entity.id = this.acquireEntityId();\n        this.entities.push(entity);\n        this.entityHash.set(entity.id, entity);\n        // Notify entity listeners that a new entity was added.\n        this.entityListeners.forEach(function (entityListener) { return entityListener.entityAdded(entity); });\n        return entity;\n    };\n    /**\n     * Retrieve an entity by its ID.\n     * @param entityId The ID of the entity to retrieve.\n     */\n    EntityManager.prototype.getEntity = function (entityId) {\n        return this.entityHash.get(entityId) || null;\n    };\n    /**\n     * Remove an entity by its ID.\n     * @param entityId The ID of the entity to remove.\n     */\n    EntityManager.prototype.removeEntity = function (entityId) {\n        var deleteEntity = this.entityHash.get(entityId);\n        if (!deleteEntity) {\n            return;\n        }\n        this.entityListeners.forEach(function (entityListener) { return entityListener.entityRemoved(deleteEntity); });\n        this.entities.splice(this.entities.indexOf(deleteEntity), 1);\n        this.entityHash.delete(entityId);\n    };\n    /**\n     * Add a listener that will be notified when entities are added/removed.\n     * @param entityListener\n     */\n    EntityManager.prototype.addEntityListener = function (entityListener) {\n        this.entityListeners.set(Class_1.getClass(entityListener), entityListener);\n    };\n    /**\n     * Remove the entity listener of the given class.\n     * @param entityListener\n     */\n    EntityManager.prototype.removeEntityListener = function (entityListenerClass) {\n        this.entityListeners.delete(entityListenerClass);\n    };\n    /**\n     * Add a component to an entity.\n     * @param entityId The ID of the entity.\n     * @param component The class of the component to add.\n     */\n    EntityManager.prototype.addComponent = function (entityId, component) {\n        var entity = this.getEntity(entityId);\n        return (entity === null || entity === void 0 ? void 0 : entity.add(component)) || false;\n    };\n    /**\n     * Retrieve a component from an entity.\n     * @param entityId The ID of the entity.\n     * @param component The class of the component to retrieve.\n     */\n    EntityManager.prototype.getComponent = function (entityId, component) {\n        var entity = this.getEntity(entityId);\n        return (entity === null || entity === void 0 ? void 0 : entity.get(component)) || null;\n    };\n    /**\n     * Check whether an entity has the given component.\n     * @param entityId The ID of the entity.\n     * @param component The class of the component check for.\n     */\n    EntityManager.prototype.hasComponent = function (entityId, component) {\n        var entity = this.getEntity(entityId);\n        return (entity === null || entity === void 0 ? void 0 : entity.has(component)) || false;\n    };\n    /**\n     * Remove a component from an entity.\n     * @param entityId The ID of the entity.\n     * @param component The class of the component to remove.\n     */\n    EntityManager.prototype.removeComponent = function (entityId, component) {\n        var entity = this.getEntity(entityId);\n        entity && entity.remove(component);\n    };\n    return EntityManager;\n}());\nexports.EntityManager = EntityManager;\n\n\n//# sourceURL=webpack:///./src/core/EntityManager.ts?");

/***/ }),

/***/ "./src/core/EntityQuery.ts":
/*!*********************************!*\
  !*** ./src/core/EntityQuery.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.EntityQuery = void 0;\nvar UniqueId_1 = __webpack_require__(/*! ./UniqueId */ \"./src/core/UniqueId.ts\");\nvar EntityQuery = /** @class */ (function () {\n    function EntityQuery(entityManager, conditions) {\n        /**\n         * The results of the query.\n         */\n        this.results = [];\n        this.any = UniqueId_1.UniqueId.bitsetForClasses.apply(UniqueId_1.UniqueId, conditions.any || []);\n        this.require = UniqueId_1.UniqueId.bitsetForClasses.apply(UniqueId_1.UniqueId, conditions.require || []);\n        this.exclude = UniqueId_1.UniqueId.bitsetForClasses.apply(UniqueId_1.UniqueId, conditions.exclude || []);\n        this.entityManager = entityManager;\n        if (this.any.count() == 0 && this.require.count() === 0 && this.exclude.count() === 0) {\n            throw new Error('Cannot create an empty query.');\n        }\n        // Populate the results from any existing entities.\n        this.results = this.entityManager.allEntities().filter(this.match.bind(this));\n        // Add this query as an entity listener.\n        this.entityManager.addEntityListener(this);\n    }\n    /**\n     * Entity listener callback.\n     *\n     * @param entity The entity added.\n     */\n    EntityQuery.prototype.entityAdded = function (entity) {\n        this.match(entity) && this.addEntity(entity);\n    };\n    /**\n     * Entity listener callback.\n     *\n     * @param entity The entity removed.\n     */\n    EntityQuery.prototype.entityRemoved = function (entity) {\n        this.match(entity) && this.removeEntity(entity);\n    };\n    /**\n     * Add the given entity to the results.\n     *\n     * @param entity The entity to add.\n     */\n    EntityQuery.prototype.addEntity = function (entity) {\n        this.results.push(entity);\n    };\n    /**\n     * Remove the given entity to the results.\n     *\n     * @param entity The entity to remove.\n     */\n    EntityQuery.prototype.removeEntity = function (entity) {\n        var index = this.results.indexOf(entity);\n        index !== -1 && this.results.splice(index, 1);\n    };\n    /**\n     * Determine if the given entity matches the current conditions.\n     *\n     * @param entity The entity to match against.\n     */\n    EntityQuery.prototype.match = function (entity) {\n        var components = entity.getComponentBitset();\n        return this.containsRequired(components)\n            && this.containsAny(components)\n            && this.containsNone(components);\n    };\n    /**\n     * Check if the given component bitset contains all required components.\n     *\n     * @param components The component bitset to check.\n     */\n    EntityQuery.prototype.containsRequired = function (components) {\n        return components.containsAll(this.require);\n    };\n    /**\n     * Check if the given component bitset contains any of the any components.\n     *\n     * @param components The component bitset to check.\n     */\n    EntityQuery.prototype.containsAny = function (components) {\n        return this.any.none() ? true : components.intersects(this.any);\n    };\n    /**\n     * Check if the given component bitset contains none of the excluded components.\n     *\n     * @param components The component bitset to check.\n     */\n    EntityQuery.prototype.containsNone = function (components) {\n        return !components.intersects(this.exclude);\n    };\n    return EntityQuery;\n}());\nexports.EntityQuery = EntityQuery;\n\n\n//# sourceURL=webpack:///./src/core/EntityQuery.ts?");

/***/ }),

/***/ "./src/core/Node.ts":
/*!**************************!*\
  !*** ./src/core/Node.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.Node = void 0;\nvar Node = /** @class */ (function () {\n    function Node() {\n        this.entities = [];\n    }\n    /**\n     * Check whether this node includes the given entity.\n     * @param entity The entity to check.\n     */\n    Node.prototype.includes = function (entity) {\n        throw new Error(\"Method not implemented.\");\n    };\n    return Node;\n}());\nexports.Node = Node;\n\n\n//# sourceURL=webpack:///./src/core/Node.ts?");

/***/ }),

/***/ "./src/core/System.ts":
/*!****************************!*\
  !*** ./src/core/System.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.System = void 0;\nvar EntityQuery_1 = __webpack_require__(/*! ./EntityQuery */ \"./src/core/EntityQuery.ts\");\n/**\n * The base class for all systems. These are intended to process entities.\n */\nvar System = /** @class */ (function () {\n    function System() {\n        /**\n         * The engine this is attached to.\n         */\n        this.engine = null;\n        /**\n         * The priority this system should be given.\n         *\n         * A lower number is given higher priority.\n         */\n        this.priority = 0;\n        /**\n         * The queries for this system.\n         */\n        this.queries = {};\n        /**\n         * This can be overridden by systems that require queried entities.\n         */\n        this.conditions = {};\n    }\n    /**\n     * Get the priority.\n     */\n    System.prototype.getPriority = function () {\n        return this.priority;\n    };\n    /**\n     * Set the priority.\n     *\n     * @param priority The priority.\n     */\n    System.prototype.setPriority = function (priority) {\n        this.priority = priority;\n        // TODO: Trigger system sorting.\n    };\n    /**\n     * Called when this system is added to the engine.\n     *\n     * @param engine The engine this system is attached to.\n     */\n    System.prototype.addedToEngine = function (engine) {\n        this.engine = engine;\n        this.buildQueries(engine.entityManager);\n    };\n    /**\n     * Called when this system is removed from the engine.\n     *\n     * @param engine The engine this system is attached to.\n     */\n    System.prototype.removedFromEngine = function (engine) {\n        this.cleanupQueries(engine.entityManager);\n        this.engine = null;\n    };\n    /**\n     * Build queries from the conditions against the given entity manager.\n     *\n     * @param entityManager The entity manager.\n     */\n    System.prototype.buildQueries = function (entityManager) {\n        var _this = this;\n        Object.entries(this.conditions).forEach(function (_a) {\n            var key = _a[0], conditions = _a[1];\n            _this.queries[key] = new EntityQuery_1.EntityQuery(entityManager, conditions);\n        });\n    };\n    /**\n     * Clean up queries.\n     */\n    System.prototype.cleanupQueries = function (entityManager) {\n        // TODO: Unregister entity listeners.\n        this.queries = {};\n    };\n    return System;\n}());\nexports.System = System;\n\n\n//# sourceURL=webpack:///./src/core/System.ts?");

/***/ }),

/***/ "./src/core/SystemManager.ts":
/*!***********************************!*\
  !*** ./src/core/SystemManager.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.SystemManager = void 0;\nvar UniqueId_1 = __webpack_require__(/*! ./UniqueId */ \"./src/core/UniqueId.ts\");\n/**\n * The default system manager implementation used by the engine.\n */\nvar SystemManager = /** @class */ (function () {\n    function SystemManager(engine) {\n        /**\n         * A contiguous array of systmes ordered by priority.\n         */\n        this.systems = [];\n        /**\n         * The hash of systems.\n         */\n        this.systemHash = {};\n        /**\n         * Whether the update loop is currently in progress.\n         */\n        this.updating = false;\n        this.engine = engine;\n    }\n    /**\n     * Whether systems are in the middle of updating.\n     */\n    SystemManager.prototype.isUpdating = function () {\n        return this.updating;\n    };\n    /**\n     * Register a system.\n     *\n     * @param system The system to register.\n     */\n    SystemManager.prototype.addSystem = function (system) {\n        var id = UniqueId_1.UniqueId.forInstance(system);\n        var old = this.systemHash[id.getIndex()] || null;\n        old && this.removeSystemInternal(id);\n        this.systems.push(system);\n        this.systemHash[id.getIndex()] = system;\n        system.addedToEngine(this.engine);\n        this.sortSystems();\n        return system;\n    };\n    /**\n     * Retrieve the system of the given type.\n     *\n     * @param systemClass The type of the system to retrieve.\n     */\n    SystemManager.prototype.getSystem = function (systemClass) {\n        var id = UniqueId_1.UniqueId.forClass(systemClass);\n        return this.getSystemInternal(id) || null;\n    };\n    /**\n     * Remove a system.\n     *\n     * @param system The system to remove.\n     */\n    SystemManager.prototype.removeSystem = function (systemClass) {\n        this.removeSystemInternal(UniqueId_1.UniqueId.forClass(systemClass));\n    };\n    /**\n     * Handle each system's logic each tick.\n     *\n     * @param engine The engine the systems are attached to.\n     * @param delta The delta.\n     */\n    SystemManager.prototype.update = function (delta) {\n        this.updating = true;\n        for (var _i = 0, _a = this.systems; _i < _a.length; _i++) {\n            var system = _a[_i];\n            system.update(delta);\n        }\n        this.updating = false;\n    };\n    /**\n     * Internal method to get systems by ID.\n     *\n     * @param id The system ID.\n     */\n    SystemManager.prototype.getSystemInternal = function (id) {\n        return this.systemHash[id.getIndex()] || null;\n    };\n    /**\n     * Internal method to handle system removal.\n     *\n     * @param id The system ID.\n     */\n    SystemManager.prototype.removeSystemInternal = function (id) {\n        var system = this.getSystemInternal(id);\n        if (system) {\n            delete this.systemHash[id.getIndex()];\n            var index = this.systems.indexOf(system);\n            index !== -1 && this.systems.splice(index, 1);\n        }\n        return system;\n    };\n    /**\n     * Sort the systems by priority.\n     */\n    SystemManager.prototype.sortSystems = function () {\n        this.systems.sort(function (a, b) { return a.getPriority() - b.getPriority(); });\n    };\n    return SystemManager;\n}());\nexports.SystemManager = SystemManager;\n\n\n//# sourceURL=webpack:///./src/core/SystemManager.ts?");

/***/ }),

/***/ "./src/core/UniqueId.ts":
/*!******************************!*\
  !*** ./src/core/UniqueId.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.UniqueId = void 0;\nvar Bitset_1 = __webpack_require__(/*! ../utils/Bitset */ \"./src/utils/Bitset.ts\");\nvar Class_1 = __webpack_require__(/*! ../utils/Class */ \"./src/utils/Class.ts\");\n/**\n * Singleton registry to keep uniqueness for IDs.\n */\nvar classRegister = [0];\nvar UniqueId = /** @class */ (function () {\n    function UniqueId(baseIndex, index, depth) {\n        this.baseIndex = baseIndex;\n        this.index = index;\n        this.depth = depth;\n    }\n    /**\n     * Get the base index.\n     */\n    UniqueId.prototype.getBaseIndex = function () {\n        return this.baseIndex;\n    };\n    /**\n     * Get the index.\n     */\n    UniqueId.prototype.getIndex = function () {\n        return this.index;\n    };\n    /**\n     * Get a string hash for this ID.\n     */\n    UniqueId.prototype.hash = function () {\n        return this.baseIndex + \"#\" + this.index;\n    };\n    /**\n     * Static ID generator for an instance of a class.\n     *\n     * @param instance The instance to generate an ID for.\n     */\n    UniqueId.forInstance = function (instance) {\n        return UniqueId.forClass(Class_1.getClass(instance));\n    };\n    /**\n     * Static ID generator for the given class.\n     *\n     * @param clazz The class to generate an ID for.\n     */\n    UniqueId.forClass = function (clazz) {\n        var uniqueId = clazz.__uniqueId;\n        var depth = Class_1.getClassDepth(clazz);\n        if (!uniqueId || uniqueId.depth !== depth) {\n            // If we don't have a unique ID for this class and it's\n            // the base class, start filling the registry array.\n            if (!uniqueId && depth === 0) {\n                var index = classRegister.length;\n                classRegister.push(0);\n                uniqueId = new UniqueId(-1, index, depth);\n            }\n            // If this isn't the base class, or we already have an ID\n            // for this class, increment the counter for this class.\n            else {\n                var baseClass = Class_1.getParentClass(clazz, depth);\n                // This will backfill the registry array for any classes in\n                // the class parentage that don't have an entry.\n                var baseUniqueId = UniqueId.forClass(baseClass);\n                var baseIndex = baseUniqueId.index;\n                var index = classRegister[baseIndex]++;\n                uniqueId = new UniqueId(baseIndex, index, depth);\n            }\n            clazz.__uniqueId = uniqueId;\n        }\n        return uniqueId;\n    };\n    /**\n     * Generate a bitset from the given list of classes.\n     *\n     * @param classes List of classes.\n     */\n    UniqueId.bitsetForClasses = function () {\n        var classes = [];\n        for (var _i = 0; _i < arguments.length; _i++) {\n            classes[_i] = arguments[_i];\n        }\n        var bitset = new Bitset_1.Bitset();\n        classes.forEach(function (clazz) { return bitset.set(UniqueId.forClass(clazz).getIndex()); });\n        return bitset;\n    };\n    return UniqueId;\n}());\nexports.UniqueId = UniqueId;\n\n\n//# sourceURL=webpack:///./src/core/UniqueId.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Component_1 = __webpack_require__(/*! ./core/Component */ \"./src/core/Component.ts\");\nvar Entity_1 = __webpack_require__(/*! ./core/Entity */ \"./src/core/Entity.ts\");\nvar EntityManager_1 = __webpack_require__(/*! ./core/EntityManager */ \"./src/core/EntityManager.ts\");\nvar EntityQuery_1 = __webpack_require__(/*! ./core/EntityQuery */ \"./src/core/EntityQuery.ts\");\nvar Engine_1 = __webpack_require__(/*! ./core/Engine */ \"./src/core/Engine.ts\");\nvar Node_1 = __webpack_require__(/*! ./core/Node */ \"./src/core/Node.ts\");\nvar System_1 = __webpack_require__(/*! ./core/System */ \"./src/core/System.ts\");\nvar SystemManager_1 = __webpack_require__(/*! ./core/SystemManager */ \"./src/core/SystemManager.ts\");\nvar UniqueId_1 = __webpack_require__(/*! ./core/UniqueId */ \"./src/core/UniqueId.ts\");\nexports.default = {\n    Component: Component_1.Component,\n    Engine: Engine_1.Engine,\n    Entity: Entity_1.Entity,\n    EntityManager: EntityManager_1.EntityManager,\n    EntityQuery: EntityQuery_1.EntityQuery,\n    Node: Node_1.Node,\n    System: System_1.System,\n    SystemManager: SystemManager_1.SystemManager,\n    UniqueId: UniqueId_1.UniqueId,\n};\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/utils/Bitset.ts":
/*!*****************************!*\
  !*** ./src/utils/Bitset.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.Bitset = void 0;\n/**\n * A bitset used for fast comparisons.\n */\nvar Bitset = /** @class */ (function () {\n    function Bitset(bits) {\n        if (bits === void 0) { bits = 64; }\n        this.data = new Int32Array(Math.max(2, Math.ceil(bits / 32)));\n    }\n    /**\n     * Check if the given bit position is set.\n     *\n     * @param position The bit position.\n     */\n    Bitset.prototype.test = function (position) {\n        var index = this.positionToIndex(position);\n        // If out of range, return false.\n        if (index >= this.data.length) {\n            return false;\n        }\n        return (this.data[index] & (1 << (position & 0x1f))) !== 0;\n    };\n    /**\n     * Set the given bit position.\n     *\n     * @param position The bit position.\n     */\n    Bitset.prototype.set = function (position) {\n        var index = this.positionToIndex(position);\n        this.allocate(index);\n        this.data[index] |= 1 << (position & 0x1f);\n    };\n    /**\n     * Set all bits.\n     */\n    Bitset.prototype.setAll = function () {\n        this.data.fill(-1);\n    };\n    /**\n     * Reset the given bit.\n     *\n     * @param position The bit position.\n     */\n    Bitset.prototype.reset = function (position) {\n        var index = this.positionToIndex(position);\n        // If out of range, return.\n        if (index > this.data.length) {\n            return;\n        }\n        this.data[index] &= ~(1 << (position & 0x1f));\n    };\n    /**\n     * Reset all bits.\n     */\n    Bitset.prototype.clear = function () {\n        this.data.fill(0);\n    };\n    /**\n     * Flip the bit at the given position.\n     *\n     * @param position The bit position.\n     */\n    Bitset.prototype.flip = function (position) {\n        var index = this.positionToIndex(position);\n        this.allocate(index);\n        this.data[index] ^= 1 << (index & 0x1f);\n    };\n    /**\n     * Count the number of bits set.\n     */\n    Bitset.prototype.count = function () {\n        for (var index = this.data.length - 1; index >= 0; index--) {\n            var data = this.data[index];\n            if (data === 0) {\n                continue;\n            }\n            for (var bit = 31; bit >= 0; bit--) {\n                if ((data & (1 << (bit & 0x1f))) !== 0) {\n                    return this.indexToBitPosition(index) + bit + 1;\n                }\n            }\n        }\n        return 0;\n    };\n    /**\n     * Get the size of the bitset in bits.\n     */\n    Bitset.prototype.size = function () {\n        return this.indexToBitPosition(this.data.length);\n    };\n    /**\n     * Whether all bits are set.\n     */\n    Bitset.prototype.all = function () {\n        throw new Error('Not yet implemented');\n    };\n    /**\n     * Whether no bits are set.\n     */\n    Bitset.prototype.none = function () {\n        for (var i = 0; i < this.data.length; i++) {\n            if (this.data[i] !== 0) {\n                return false;\n            }\n        }\n        return true;\n    };\n    /**\n     * Perform a bitwise AND against another bitset.\n     *\n     * @param other The other bitset.\n     */\n    Bitset.prototype.and = function (other) {\n        var commonIndices = Math.min(this.data.length, other.data.length);\n        for (var i = 0; commonIndices > i; i++) {\n            this.data[i] &= other.data[i];\n        }\n        if (this.data.length > commonIndices) {\n            for (var i = 0, s = this.data.length; s > i; i++) {\n                this.data[i] = 0;\n            }\n        }\n        return this;\n    };\n    /**\n     * Resets all bits that are set in the other bitset.\n     *\n     * @param other The other bitset.\n     */\n    Bitset.prototype.andNot = function (other) {\n        var commonIndices = Math.min(this.data.length, other.data.length);\n        for (var i = 0; i < commonIndices; i++) {\n            this.data[i] &= ~other.data[i];\n        }\n        return this;\n    };\n    /**\n     * Perform a bitwise OR against another bitset.\n     *\n     * @param other The other bucket.\n     */\n    Bitset.prototype.or = function (other) {\n        var commonIndices = Math.min(this.data.length, other.data.length);\n        for (var i = 0; commonIndices > i; i++) {\n            this.data[i] |= other.data[i];\n        }\n        if (commonIndices < other.data.length) {\n            this.allocate(other.data.length);\n            for (var i = commonIndices, s = other.data.length; s > i; i++) {\n                this.data[i] = other.data[i];\n            }\n        }\n        return this;\n    };\n    /**\n     * Perform a bitwise XOR against another bitset.\n     *\n     * @param other The other bitset.\n     */\n    Bitset.prototype.xor = function (other) {\n        var commonIndices = Math.min(this.data.length, other.data.length);\n        for (var i = 0; commonIndices > i; i++) {\n            this.data[i] ^= other.data[i];\n        }\n        if (commonIndices < other.data.length) {\n            this.allocate(other.data.length);\n            for (var i = commonIndices, s = other.data.length; s > i; i++) {\n                this.data[i] = other.data[i];\n            }\n        }\n        return this;\n    };\n    /**\n     * Check if the other bitset shares any set bits with this one.\n     *\n     * @param other The other bitset.\n     */\n    Bitset.prototype.intersects = function (other) {\n        for (var i = Math.min(this.data.length, other.data.length) - 1; i >= 0; i--) {\n            if ((this.data[i] & other.data[i]) !== 0) {\n                return true;\n            }\n        }\n        return false;\n    };\n    /**\n     * Check if the other bitset contains all bits set in this bitset.\n     *\n     * @param other The other bitset.\n     */\n    Bitset.prototype.containsAll = function (other) {\n        for (var i = this.data.length; i < other.data.length; i++) {\n            if (other.data[i] !== 0) {\n                return false;\n            }\n        }\n        for (var i = Math.min(this.data.length, other.data.length) - 1; i >= 0; i--) {\n            if ((this.data[i] & other.data[i]) !== other.data[i]) {\n                return false;\n            }\n        }\n        return true;\n    };\n    /**\n     * Return the number of allocated indices.\n     */\n    Bitset.prototype.allocatedIndices = function () {\n        for (var i = this.data.length - 1; i >= 0; i--) {\n            if (this.data[i] !== 0) {\n                return i + 1;\n            }\n        }\n        return 0;\n    };\n    /**\n     * Ensure the given index is allocated and can have bits set.\n     *\n     * @param index The index to allocate.\n     */\n    Bitset.prototype.allocate = function (index) {\n        if (index <= this.data.length) {\n            return;\n        }\n        var data = new Int32Array(index + 1);\n        data.set(this.data);\n        this.data = data;\n    };\n    /**\n     * Convert a bit position to an index for the data array.\n     *\n     * @param position The bit position.\n     */\n    Bitset.prototype.positionToIndex = function (position) {\n        return position >> 5;\n    };\n    /**\n     * Convert an index to a bit position.\n     * @param index The index.\n     */\n    Bitset.prototype.indexToBitPosition = function (index) {\n        return index << 5;\n    };\n    return Bitset;\n}());\nexports.Bitset = Bitset;\n\n\n//# sourceURL=webpack:///./src/utils/Bitset.ts?");

/***/ }),

/***/ "./src/utils/Class.ts":
/*!****************************!*\
  !*** ./src/utils/Class.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.getClassDepth = exports.getParentClass = exports.getClass = void 0;\n/**\n * Get the constructor for the given instance.\n *\n * @param instance\n * @return {Constructor} the constructor\n */\nfunction getClass(instance) {\n    return Object.getPrototypeOf(instance).constructor;\n}\nexports.getClass = getClass;\nfunction getParentClass(clazz, depth) {\n    if (depth === void 0) { depth = 1; }\n    while (depth > 0) {\n        clazz = Object.getPrototypeOf(clazz);\n        depth--;\n    }\n    return clazz;\n}\nexports.getParentClass = getParentClass;\n/**\n * Get the depth of the given class.\n *\n * The depth is the number of parent classes the class has.\n *\n * @param clazz The class.\n */\nfunction getClassDepth(clazz) {\n    var depth = 0;\n    while (clazz) {\n        clazz = Object.getPrototypeOf(clazz);\n        depth++;\n    }\n    // A class with no parents will have depth = 3, so normalize.\n    return depth - 3;\n}\nexports.getClassDepth = getClassDepth;\n\n\n//# sourceURL=webpack:///./src/utils/Class.ts?");

/***/ })

/******/ });