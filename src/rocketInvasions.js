"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRocketInvasions = void 0;
// Node modules.
var lodash_1 = require("lodash");
var puppeteer_1 = require("puppeteer");
var node_html_parser_1 = require("node-html-parser");
var url_join_1 = require("url-join");
var sprintf_js_1 = require("sprintf-js");
var pmgo_pokedex_1 = require("pmgo-pokedex");
// Local modules.
var utils_1 = require("./utils");
var rocket_invasion_category_tags_json_1 = require("../data/rocket-invasion-category-tags.json");
var rocket_invasion_description_dictionary_json_1 = require("../data/rocket-invasion-description-dictionary.json");
var pokedex = new pmgo_pokedex_1.Pokedex();
var translateDescription = function (description) {
    var matchedRule = rocket_invasion_description_dictionary_json_1.default.find(function (rule) { return (new RegExp(rule.pattern, 'i')).test(description); });
    if (matchedRule) {
        var _a = description.match(new RegExp(matchedRule.pattern, 'i')), matches = _a.slice(1);
        return sprintf_js_1.sprintf.apply(void 0, __spreadArray([matchedRule.displayText], matches, false));
    }
    else {
        return description;
    }
};
var categoryMapping = function (categoryTag) {
    var matchedTag = rocket_invasion_category_tags_json_1.default.find(function (tag) { return tag.text === categoryTag; });
    if (matchedTag) {
        return matchedTag.displayText;
    }
    else {
        return categoryTag;
    }
};
var characterImageUrlMapping = function (characterName) {
    var baseUrl = 'https://raw.githubusercontent.com/pmgo-professor-willow/data-pokemongohub/main/assets/';
    switch (characterName) {
        case 'Cliff':
            return (0, url_join_1.default)(baseUrl, '/leader-cliff.png');
        case 'Arlo':
            return (0, url_join_1.default)(baseUrl, '/leader-arlo.png');
        case 'Sierra':
            return (0, url_join_1.default)(baseUrl, '/leader-sierra.png');
        case 'Giovanni':
            return (0, url_join_1.default)(baseUrl, '/boss-giovanni.png');
        case 'James':
            return (0, url_join_1.default)(baseUrl, '/leader-james.png');
        case 'Jessie':
            return (0, url_join_1.default)(baseUrl, '/leader-jessie.png');
        default:
            return lodash_1.default.random(1)
                ? (0, url_join_1.default)(baseUrl, '/grunt-male.png')
                : (0, url_join_1.default)(baseUrl, '/grunt-female.png');
    }
};
var getGruntRocketInvasions = function () { return __awaiter(void 0, void 0, void 0, function () {
    var rocketInvasionUrl, browser, page, xml, root, rocketInvasionItems, rocketInvasions, _i, rocketInvasionItems_1, rocketInvasionItem, orignialQuote, categoryRaw, lineupSlotItems, lineupPokemons, sortedRocketInvasions;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                rocketInvasionUrl = (0, url_join_1.default)(utils_1.hostUrl, '/post/guide/team-go-rocket-battle-guide/');
                return [4 /*yield*/, puppeteer_1.default.launch({
                        args: ['--no-sandbox'],
                        executablePath: process.env.PUPPETEER_EXEC_PATH,
                        headless: false,
                    })];
            case 1:
                browser = _e.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _e.sent();
                return [4 /*yield*/, page.goto(rocketInvasionUrl, { waitUntil: 'networkidle0' })];
            case 3:
                _e.sent();
                return [4 /*yield*/, page.evaluate(function () { var _a; return (_a = document.querySelector('*')) === null || _a === void 0 ? void 0 : _a.outerHTML; })];
            case 4:
                xml = _e.sent();
                return [4 /*yield*/, page.waitForTimeout(1000)];
            case 5:
                _e.sent();
                return [4 /*yield*/, browser.close()];
            case 6:
                _e.sent();
                root = (0, node_html_parser_1.parse)(xml);
                rocketInvasionItems = root.querySelectorAll('.hub-colored-section');
                rocketInvasions = [];
                for (_i = 0, rocketInvasionItems_1 = rocketInvasionItems; _i < rocketInvasionItems_1.length; _i++) {
                    rocketInvasionItem = rocketInvasionItems_1[_i];
                    orignialQuote = (_b = (_a = rocketInvasionItem.querySelector('h2')) === null || _a === void 0 ? void 0 : _a.rawText.trim()) !== null && _b !== void 0 ? _b : '';
                    categoryRaw = (_d = (_c = rocketInvasionItem.querySelector('p span.type-badge')) === null || _c === void 0 ? void 0 : _c.rawText.trim()) !== null && _d !== void 0 ? _d : '';
                    lineupSlotItems = rocketInvasionItem.querySelectorAll('.hub-scrollable table tr td');
                    lineupPokemons = lineupSlotItems.reduce(function (all, lineupSlotItem, i) {
                        var lineupPokemonItems = lineupSlotItem.querySelectorAll('a');
                        lineupPokemonItems.forEach(function (lineupPokemonItem, j) {
                            var _a, _b, _c, _d;
                            var originalName = (_b = (_a = lineupPokemonItem.querySelector('.content .name')) === null || _a === void 0 ? void 0 : _a.rawText.trim()) !== null && _b !== void 0 ? _b : '';
                            var pokemon = pokedex.getPokemonByFuzzyName(originalName);
                            var imageUrl = (_d = (_c = lineupPokemonItem.querySelector('img')) === null || _c === void 0 ? void 0 : _c.getAttribute('data-lazy-src')) !== null && _d !== void 0 ? _d : '';
                            var shinyAvailable = lineupPokemonItem.classNames.includes('shiny');
                            all.push({
                                slotNo: i + 1,
                                no: pokemon.no,
                                // name: pokemon.form ? `${pokemon.name} (${pokemon.form})` : pokemon.name,
                                name: pokemon.name,
                                originalName: originalName,
                                types: pokemon.types,
                                catchable: false,
                                shinyAvailable: shinyAvailable,
                                imageUrl: imageUrl,
                            });
                        });
                        return all;
                    }, []);
                    rocketInvasions.push({
                        quote: translateDescription(orignialQuote),
                        orignialQuote: orignialQuote,
                        category: categoryMapping(categoryRaw),
                        characterImageUrl: characterImageUrlMapping(),
                        isSpecial: false,
                        lineupPokemons: lineupPokemons,
                    });
                }
                sortedRocketInvasions = lodash_1.default.orderBy(rocketInvasions, function (rocketInvasion) {
                    var matchedTag = rocket_invasion_category_tags_json_1.default.find(function (tag) { return tag.displayText === rocketInvasion.category; });
                    return matchedTag === null || matchedTag === void 0 ? void 0 : matchedTag.priority;
                }, ['asc']);
                return [2 /*return*/, sortedRocketInvasions];
        }
    });
}); };
var getLeaderRocketInvasions = function (category, leaderName) { return __awaiter(void 0, void 0, void 0, function () {
    var rocketInvasionUrl, browser, page, xml, root, tableItem, rocketInvasions, lineupSlotItems, lineups, lineupPokemons, sortedRocketInvasions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                rocketInvasionUrl = (0, url_join_1.default)(utils_1.hostUrl, "/post/guide/rocket-".concat(category.toLocaleLowerCase(), "-").concat(leaderName.toLocaleLowerCase(), "-counters/"));
                return [4 /*yield*/, puppeteer_1.default.launch({
                        args: ['--no-sandbox'],
                        executablePath: process.env.PUPPETEER_EXEC_PATH,
                        headless: false,
                    })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.goto(rocketInvasionUrl, { waitUntil: 'networkidle0' })];
            case 3:
                _a.sent();
                return [4 /*yield*/, page.evaluate(function () { var _a; return (_a = document.querySelector('*')) === null || _a === void 0 ? void 0 : _a.outerHTML; })];
            case 4:
                xml = _a.sent();
                return [4 /*yield*/, page.waitForTimeout(1000)];
            case 5:
                _a.sent();
                return [4 /*yield*/, browser.close()];
            case 6:
                _a.sent();
                root = (0, node_html_parser_1.parse)(xml);
                tableItem = root.querySelector('.hub-scrollable table');
                rocketInvasions = [];
                lineupSlotItems = tableItem.querySelectorAll('tr td');
                lineups = category === 'Leader'
                    ? [
                        // Slot 1
                        [lineupSlotItems[0]],
                        // Slot 2
                        [lineupSlotItems[1], lineupSlotItems[3], lineupSlotItems[5]],
                        // Slot 3
                        [lineupSlotItems[2], lineupSlotItems[4], lineupSlotItems[6]],
                    ]
                    : [
                        // Slot 1
                        [lineupSlotItems[0]],
                        // Slot 2
                        [lineupSlotItems[1], lineupSlotItems[3], lineupSlotItems[4]],
                        // Slot 3
                        [lineupSlotItems[2]],
                    ];
                lineupPokemons = lineups.reduce(function (all, lineupSlotItems, i) {
                    lineupSlotItems.forEach(function (lineupSlotItem) {
                        var lineupPokemonItems = lineupSlotItem.querySelectorAll('a');
                        lineupPokemonItems.forEach(function (lineupPokemonItem, j) {
                            var _a, _b, _c, _d;
                            var slotNo = i + 1;
                            var originalName = (_b = (_a = lineupPokemonItem.querySelector('.content .name')) === null || _a === void 0 ? void 0 : _a.rawText.trim()) !== null && _b !== void 0 ? _b : '';
                            var pokemon = pokedex.getPokemonByFuzzyName(originalName);
                            var imageUrl = (_d = (_c = lineupPokemonItem.querySelector('img')) === null || _c === void 0 ? void 0 : _c.getAttribute('data-lazy-src')) !== null && _d !== void 0 ? _d : '';
                            var catchable = (category === 'Leader' && slotNo === 1) || (category === 'Boss' && slotNo === 3);
                            var shinyAvailable = category === 'Leader' && lineupPokemonItem.classNames.includes('shiny');
                            all.push({
                                slotNo: slotNo,
                                no: pokemon.no,
                                // name: pokemon.form ? `${pokemon.name} (${pokemon.form})` : pokemon.name,
                                name: pokemon.name,
                                originalName: originalName,
                                types: pokemon.types,
                                catchable: catchable,
                                shinyAvailable: shinyAvailable,
                                imageUrl: imageUrl,
                            });
                        });
                    });
                    return all;
                }, []);
                rocketInvasions.push({
                    quote: '',
                    orignialQuote: '',
                    category: categoryMapping("".concat(category, " ").concat(leaderName)),
                    characterImageUrl: characterImageUrlMapping(leaderName),
                    isSpecial: true,
                    lineupPokemons: lineupPokemons,
                });
                sortedRocketInvasions = lodash_1.default.orderBy(rocketInvasions, function (rocketInvasion) {
                    var matchedTag = rocket_invasion_category_tags_json_1.default.find(function (tag) { return tag.displayText === rocketInvasion.category; });
                    return matchedTag === null || matchedTag === void 0 ? void 0 : matchedTag.priority;
                }, ['asc']);
                return [2 /*return*/, sortedRocketInvasions];
        }
    });
}); };
var getRocketInvasions = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _a = [[]];
                return [4 /*yield*/, getGruntRocketInvasions()];
            case 1:
                _b = [__spreadArray.apply(void 0, _a.concat([_f.sent(), true]))];
                return [4 /*yield*/, getLeaderRocketInvasions('Leader', 'Sierra')];
            case 2:
                _c = [__spreadArray.apply(void 0, _b.concat([_f.sent(), true]))];
                return [4 /*yield*/, getLeaderRocketInvasions('Leader', 'Cliff')];
            case 3:
                _d = [__spreadArray.apply(void 0, _c.concat([_f.sent(), true]))];
                return [4 /*yield*/, getLeaderRocketInvasions('Leader', 'Arlo')];
            case 4:
                _e = [__spreadArray.apply(void 0, _d.concat([_f.sent(), true]))];
                return [4 /*yield*/, getLeaderRocketInvasions('Boss', 'Giovanni')];
            case 5: return [2 /*return*/, __spreadArray.apply(void 0, _e.concat([_f.sent(), true]))];
        }
    });
}); };
exports.getRocketInvasions = getRocketInvasions;
