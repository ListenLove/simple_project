(function (window, undefined) {
    let njQuery = function (selector) {
        return new njQuery.prototype.init(selector);
    }
    njQuery.prototype = {
        constructor: njQuery,
        /**
         * njQuery 的核心函数
         * @param selector 选择器/代码片段/其他类型
         * @return {njQuery}
         */
        init: function (selector) {

            /*1. 传入`"", null, undefined, NaN, false, 0`

               返回`jQuery`空对象。 */
            if (!selector) return this;

            else if (njQuery.isFunction(selector)) {
                njQuery.ready(selector);
            }

            /*2. 字符串

                如果是**代码片段**的话，会将创建高的`DOM`元素存储到`jQuery`对象中返回；

                如果是**选择器的**话，会找到选择器对应的所有元素，并存储到`jQuery`对象中返回。*/
            else if (njQuery.isString(selector)) {
                // 2.1 判断是否为代码片段
                if (njQuery.isHTML(selector)) {
                    // 1。 根据代码片段创建所有元素
                    let temp = document.createElement("div");
                    temp.innerHTML = selector;
                    /*// 2. 将创建好的一级元素添加到jQuery中
                    for (let i = 0; i < temp.children.length; i++) {
                        this[i] = temp.children[i];
                    }
                    // 3. 给 jQuery 对象添加 length 属性
                    this.length = temp.children.length;*/

                    [].push.apply(this, temp.children); /*真数组，转换为伪数组的过程*/
                    // [].slice.call(this) 伪数组转换为真数组
                    console.log(this);
                    // 4. 返回加工好的 this(jQuery)
                    return this;
                } else {
                    /*传入的字符串为选择器字符串*/
                    let result = document.querySelectorAll(selector);
                    [].push.apply(this, result);
                    // console.log(this);
                    // return this;
                }
            }

            /*3. 数组

               会将数组中存储的元素一次存储到`jQuery`对象中返回。*/
            else if (njQuery.isArray(selector)) {
                // 3.1 真数组
                /*if (njQuery.isTrulyArray(selector)) {
                    [].push.apply(this, selector);
                    // console.log(this);
                    return this;
                } else {
                    // 伪数组
                    let arr = [].slice.call(selector);
                    [].push.apply(this, arr);
                    // console.log(this);
                    return this;
                }*/
                let arr = [].slice.call(selector);
                [].push.apply(this, arr);
                // console.log(this);
                // return this;
            }

            /*4. 除上述类型外的：

               会将传入的数据存储到`jQuery`对象中返回。/*/
            else {
                this[0] = selector;
                this.length = 1;
                // return this;
            }
            return this;
        },
        jquery: "1.1.0",
        selector: "",
        length: 0,
        push: [].push,  /*该push 将来也由 njQuery 对象调用*/
        sort: [].sort,
        slice: [].slice,
        /**
         * 返回 jquery 对象真数组形式
         * @return {*[]}
         */
        toArray: function () {
            return [].slice.call(this);
        },
        /**
         * 返回 jQuery对象中 num 指定 index 的原生DOM对象。
         * @param num Number类型
         * @return {*[]|*} 返回 jQuery对象中 num 指定 index 的原生DOM对象。
         */
        get: function (num) {
            // 没有传递参数时
            if (arguments.length === 0) {
                return this.toArray();
            } else if (num >= 0) {
                return this[num];
            } else {
                return this[this.length + num];
            }
        },
        /**
         * 返回 njQuery对象中 num 指定 index 的 njQuery对象。
         * @param num Number类型
         * @return {*} 返回 njQuery对象中 num 指定 index 的 njQuery对象。
         */
        eq: function (num) {
            // 没有穿肚参数
            if (arguments.length === 0) {
                return new njQuery();
            } else {
                return njQuery(this.get(num))
            }
        },
        /**
         *
         * @return {*} 返回 jQuery对象的第一个子元素
         */
        first: function () {
            return this.eq(0);
        },
        /**
         *
         * @return {*} 返回 jQuery对象的最后一个子元素
         */
        last: function () {
            return this.eq(-1);
        },
        /**
         * 遍历 jQuery对象方法
         * @param fn 回调函数，处理 jQuery 对象的每一个元素。
         */
        each: function (fn) {
            njQuery.each(this, fn);
        }

    };
    njQuery.extend = njQuery.prototype.extend = function (obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                this[key] = obj[key];
        }
    };
    /*
    * 工具方法
     */
    njQuery.extend({
        /**
         * jQuery map 方法，返回回调函数对传入集合（或数组或最象）处理结果的数组。
         * @param obj 传入的集合对象
         * @param fn 回调函数，第一参数为 value， 第二参数为 index，回调函数中返回的值才会存入 map 返回的数组中。
         * @return {[]} 返回数组对象。
         */
        map: function (obj, fn) {
            let res = [];
            // 判断是否为数组
            if (njQuery.isArray(obj)) {
                for (let i = 0; i < obj.length; i++) {
                    let temp = fn(obj[i], i);
                    if (temp) {
                        res.push(temp);
                    }
                }
            }
            // 判断是否为对象
            else if (njQuery.isObject(obj)) {
                for (let key in obj) {
                    let temp = fn(obj[key], key);
                    if (temp) {
                        res.push(temp);
                    }
                }
            }
            return res;
        },
        /**
         * jQuery each 方法，对 jQuery 对象进行遍历
         * @param obj 集合对象，可以使真伪数组，也可以是对象
         * @param fn 回调函数，对 jQuery对象中每一个元素遍历进行处理。如果 fn 返回 true，表示跳过。false 则是终止 each方法。
         * @return {*} 返回遍历的对象
         */
        each: function (obj, fn) {
            // 判断是否为数组
            if (njQuery.isArray(obj)) {
                for (let i = 0; i < obj.length; i++) {
                    let res = fn.call(obj[i], i, obj[i]);
                    if (res === true) {
                        continue;
                    } else if (res === false) {
                        break;
                    }
                }
            }
            // 判断是否为对象
            else if (njQuery.isObject(obj)) {
                for (let key in obj) {
                    let res = fn.call(obj[key], key, obj[key]);
                    if (res === true) {
                        continue;
                    } else if (res === false) {
                        break;
                    }
                }
            }
            // each 遍历谁就返回谁
            return obj;
        },

        /**
         * 判断 str 对象是否为字符串类型方法
         * @param str
         * @return {boolean} str 是字符串返回 true，否则返回 false。
         */
        isString: function (str) {
            return typeof str === "string";
        },
        /**
         * 判断 str 对象是否为代码块的方法
         * @param str
         * @return {boolean} str 是代码块返回 true，否则返回 false。
         */
        isHTML: function (str) {
            if (!njQuery.isString(str)) return str;
            str = njQuery.trim(str);   /*先处理字符串，取出两端的空白字符*/
            return str.charAt(0) === "<" && str.charAt(str.length - 1) === ">" &&
                str.length >= 3;
        },
        /**
         * 去除字符串两端的空白字符
         * @param str
         * @return {jQuery|string|string|*} 返回去除了两端空白字符串的字串。
         */
        trim: function (str) {
            if (str.trim) {
                return str.trim();
            } else {
                return str.replace(/^\s+|\s+$/g, "");
            }
        },
        /**
         * 判断 str 对象是否为 object 类型
         * @param str
         * @return {boolean} 如果是 object 类型 返回 true，否则返回 false。
         */
        isObject: function (str) {
            return typeof str === "object";
        },
        /**
         * 判断 str 传入参数为否为 window 对象。
         * @param str
         * @return {boolean} 如果是 window 对象则返回true，否则返回 false。
         */
        isWindow: function (str) {
            return str === window;
        },
        /**
         * 判断传入参数是否为数组
         * @param arr
         * @return {boolean} 如果是数组（不论真伪）返回 true， 否则返回 false。
         */
        isArray: function (arr) {
            return njQuery.isObject(arr) && "length" in arr && !njQuery.isWindow(arr);
        },
        /**
         * 判断 传入数组是否为真数组
         * @param arr
         * @return {boolean} 如果是数组是真数组则返回 true， 否则返回 false。
         */
        isTrulyArray: function (arr) {
            return ({}).toString.apply(arr) === "[object Array]";
        },
        /**
         * 判断传入参数 obj 是否为 函数。
         * @param obj
         * @return {boolean} 如果传入参数是函数对象则返回 true， 否则返回 false。
         */
        isFunction: function (obj) {
            return typeof obj === "function";
        },
        /**
         * njQuery 入口函数
         * @param fn 等待DOM加载完毕后开始调用 fn
         */
        ready: function (fn) {
            if (document.readyState === "complete") {
                fn();
            } else if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", function () {
                    fn();
                });
            } else {
                document.attachEvent("onreadystatechange", function () {
                    if (document.readyState === "complete")
                        fn();
                });
            }
        },
        /**
         * 获取节点元素的 CSS 样式属性值
         * @param dom dom 节点对象
         * @param styleName css 样式属性名
         * @return {string|*}  返回属性值
         */
        getStyle: function (dom, styleName) {
            if (window.getComputedStyle) {
                return window.getComputedStyle(dom)[styleName];
            } else {
                return dom.currentStyle[styleName];
            }
        },
        /**
         * 将 type 事件绑定至指定 dom 元素的工具方法
         * @param dom 指定 HTML dom 元素
         * @param type 事件类型
         * @param callback 响应事件的回调函数
         */
        addEvent: function (dom, type, callback) {
            if (dom.addEventListener) {
                // 监听事件，等待一次执行事件的回调函数
                dom.addEventListener(type, callback);
            } else {
                // 监听事件，等待一次执行事件的回调函数
                dom.attachEvent("on" + type, callback);
            }
        },

    });
    /**
     * njQuery 操作 DOM 的相关方法
     */
    njQuery.prototype.extend({
        /**
         * jQuery 清空对象子元素 DOM 内容的方法
         * @return {njQuery} 返回调用该方法的对象
         */
        empty: function () {
            // 1. 遍历
            this.each(function (index, value) {
                value.innerHTML = "";
            });
            // 2. 返回遍历对象，便于链式编程。
            return this;
        },
        /**
         * 调用该方法的对象会删除本身于 DOM 中的对象
         * @param selector 选定jQuery对象中指定选择器进行删除
         */
        remove: function (selector) {
            if (arguments.length === 0) {
                // 遍历元素
                this.each(function (key, value) {
                    // 找到父元素
                    let parent = value.parentNode;
                    parent.removeChild(value);
                })
            } else {
                let $this = this;
                $(selector).each(function (key, value) {
                    let type = value.tagName;
                    $this.each(function (k, v) {
                        let t = v.tagName;
                        if (t === type) {
                            // 找到父元素
                            let parent = v.parentNode;
                            if (parent)
                                parent.removeChild(v);
                        }
                    });
                });
                return this;
            }

        },
        /**
         * jQuery html 对象的 html 方法
         * @param content 不传参数时返回选择器指定的的第一个jQuery对象；传递参数时，所有 jQuery
         * 对象的 innerHTML 替换为 content 代码块
         * @return {string|string|*}
         */
        html: function (content) {
            if (arguments.length === 0) {
                return this[0].innerHTML;
            } else {
                this.each(function (key, value) {
                    value.innerHTML = content;
                });
            }
        },
        /**
         * jQuery 对象的 text 方法
         * @param content 不传参数时返回选择器指定的的第一个 jQuery 对象的 innerText；传递参数时，所有 jQuery
         * 对象的 innerText 替换为 content 代码块
         * @return {string|string|*}
         */
        text: function (content) {
            let res = "";
            if (arguments.length === 0) {
                this.each(function (key, value) {
                    res += value.innerText;
                });
                return res;
            } else {
                this.each(function (key, value) {
                    value.innerText = content;
                });
            }
        },
        /**
         * appendTo 方法将调用该方法的对象，添加到 selector 对象的末尾
         * @param selector 选择器 或者 jQuery 对象
         * @return {[]} 返回添加了的所有 jQuery 对象数组。
         */
        appendTo: function (selector) {
            // 将传入对象转换为 jQuery 对象
            let $target = $(selector);
            let $this = this;
            let res = [];
            // 1. 遍历所有指定的元素
            $target.each(function (key, value) {
                // 2. 遍历取出所有的元素，等待添加至取出元素的末尾
                $this.each(function (k, v) {
                    if (key === 0) {
                        value.appendChild(v);
                        res.push(v);
                    } else {
                        let temp = v.cloneNode(true);
                        value.appendChild(temp);
                        res.push(temp);
                    }
                });
            });
            return res;
        },
        /**
         * prependTo 方法将调用该方法的对象，添加到 selector 对象的开头
         * @param selector 选择器 或者 jQuery 对象
         * @return {[]} 返回添加了的所有 jQuery 对象数组。
         */
        prependTo: function (selector) {
            // 将传入对象转换为 jQuery 对象
            let $target = $(selector);
            let $this = this;
            let res = [];
            // 1. 遍历所有指定的元素
            $target.each(function (key, value) {
                // 2. 遍历取出所有的元素，等待添加至取出元素的末尾
                $this.each(function (k, v) {
                    if (key === 0) {
                        value.insertBefore(v, value.firstChild);
                        res.push(v);
                    } else {
                        let temp = v.cloneNode(true);   /*cloneNode 传入参数为 true 是深拷贝*/
                        value.insertBefore(temp, value.firstChild);
                        res.push(temp);
                    }
                });
            });
            return res;
        },
        /**
         * 将 selector 指定的对象添加到调用者元素子元素层的末尾
         * @param selector 如果是字符串的直接添加字符串，如果是 jQuery 对象才会将 selector
         * 添加到调用对象的子元素层末尾
         * @return {njQuery} 返回调用者对象
         */
        append: function (selector) {
            // 不会把字符串当选择器
            if (njQuery.isString(selector)) {
                this.get(0).innerHTML += selector;
            } else {
                $(selector).appendTo(this);
            }
            // 直接返回调用者
            return this;
        },
        /**
         * 将 selector 指定的对象添加到调用者元素子元素层的开头
         * @param selector 如果是字符串的直接添加字符串，如果是 jQuery 对象才会将 selector
         * 添加到调用对象的子元素层开头
         * @return {njQuery} 返回调用者对象
         */
        prepend: function (selector) {
            // 不会把字符串当选择器
            if (njQuery.isString(selector)) {
                this.get(0).innerHTML = selector + this.get(0).innerHTML;
            } else {
                $(selector).prependTo(this);
            }
            // 直接返回调用者
            return this;
        },
        /**
         * 将调用者元素添加到指定元素 selector 外部的后面
         * @param selector 指定元素
         */
        insertAfter: function (selector) {
            let result = [];
            if (njQuery.isString(selector)) {
                selector = $(selector);
            }
            let $this = this;
            selector.each(function (key, value) {
                let parent = value.parentNode;
                $this.each(function (k, v) {
                    if (key === 0) {
                        parent.insertBefore(v, value.nextSibling);
                        result.push(v)
                    } else {
                        let temp = v.cloneNode(true);
                        parent.insertBefore(temp, value.nextSibling);
                        result.push(temp)
                    }
                })
            })
            return result;
        },
        /**
         * 添加指定元素 selector 到调用者元素外部的后面
         * @param selector 指定元素
         * @return {[]} 返回调用的对象
         */
        after: function (selector) {
            if (njQuery.isString(selector)) {
                this.each(function (key, value) {
                    let newItem = document.createTextNode(selector);
                    value.parentNode.insertBefore(newItem, value.nextSibling);
                });
            } else {
                this.each(function (key, value) {
                    let parent = value.parentNode;
                    selector.each(function (k, v) {
                        if (key === 0) {
                            parent.insertBefore(v, value.nextSibling);
                        } else {
                            let temp = v.cloneNode(true);
                            parent.insertBefore(temp, value.nextSibling);
                        }
                    });
                });
            }
            return this;
            // return result;
        },
        /**
         * 调用者元素将自身插入到所有指定元素 selector 外部之前
         * @param selector 指定元素
         * @return {[]}
         */
        insertBefore: function (selector) {
            // 将传入对象转换为 jQuery 对象
            let $target = $(selector);
            let $this = this;
            let res = [];
            // 1. 遍历所有指定的元素
            $target.each(function (key, value) {
                // 2. 遍历取出所有的目标元素的父元素，等待添加至取出元素的开头
                let parent = value.parentNode;
                $this.each(function (k, v) {
                    if (key === 0) {
                        if (parent) {
                            parent.insertBefore(v, value);
                            res.push(v);
                        }

                    } else {
                        let temp = v.cloneNode(true);   /*cloneNode 传入参数为 true 是深拷贝*/
                        parent.insertBefore(temp, value);
                        res.push(temp);
                    }
                });
            });
            return res;
        },
        /**
         * 将指定元素 selector 传入到调用者元素的外部之前
         * @param selector 指定元素
         * @return {[]} 返回调用者 jQuery 对象
         */
        before: function (selector) {
            if (njQuery.isString(selector)) {
                this.each(function (key, value) {
                    let parent = value.parentNode;
                    let newItem = document.createTextNode(selector);
                    parent.insertBefore(newItem, value);
                });
            } else {
                this.each(function (key, value) {
                    let parent = value.parentNode;
                    selector.each(function (k, v) {
                        if (key === 0) {
                            parent.insertBefore(v, value);
                        } else {
                            let temp = v.cloneNode(true);
                            parent.insertBefore(temp, value);
                        }
                    });
                });
            }
            return this;
        },
        replaceAll: function (selector) {
            // 将传入对象转换为 jQuery 对象
            let $target = $(selector);
            let $this = this;
            let res = [];
            // 1. 遍历所有指定的元素
            $target.each(function (key, value) {
                // 2. 遍历取出所有的目标元素的父元素，等待添加至取出元素的开头
                $this.each(function (k, v) {
                    if (key === 0) {
                        $(v).insertBefore(value);
                        res.push(v);
                    } else {
                        let temp = v.cloneNode(true);   /*cloneNode 传入参数为 true 是深拷贝*/
                        $(temp).insertBefore(value);
                        res.push(temp);
                    }
                });
                $(value).remove();
            });
            return res;
        },
        replaceWith: function (selector) {
            // 将传入对象转换为 jQuery 对象
            let $target = $(selector);
            let $this = this;
            let res = [];
            // 1. 遍历所有指定的元素
            $this.each(function (key, value) {
                // 2. 遍历取出所有的目标元素的父元素，等待添加至取出元素的开头
                $target.each(function (k, v) {
                    if (key === 0) {
                        $(v).insertBefore(value);
                        res.push(v);
                    } else {
                        let temp = v.cloneNode(true);   /*cloneNode 传入参数为 true 是深拷贝*/
                        $(temp).insertBefore(value);
                        res.push(temp);
                    }
                });
                $(value).remove();
            });
            return res;
        },
        clone: function (deep) {
            // 判断是否是深复制 deep copy
            let res = [];
            if (deep) {
                // 深复制
                this.each(function (key, ele) {
                    let temp = ele.cloneNode(true);
                    njQuery.each(ele.eventsCache, function (name, array) {
                        // 遍历事件对应的回调数组
                        njQuery.each(array, function (index, method) {
                            // 将事件回调数组中的回调函数全部复制到新生成的节点上
                            $(temp).on(name, method);
                        })
                    })
                    res.push(temp);
                });
            } else {
                // 浅复制
                this.each(function (key, ele) {
                    let temp = ele.cloneNode(true);
                    res.push(temp);
                });
            }
            return $(res);
        }
    });
    /** njQuery 操作属性节点的相关方法
     * */
    njQuery.prototype.extend({
        /**
         * 获取 jQuery 对象的属性或者设置（采用对象批量设置） jQuery 对象属性
         * @param attr 只传入一个参数且参数为字符串，会获取对象中该属性的值。只传入一个参数且参数为对象，
         * 那么会批量设置属性值
         * @param value 设置属性值
         */
        attr: function (attr, value) {
            if (njQuery.isString(attr)) {
                if (arguments.length === 1) {
                    return this[0].getAttribute(attr);
                } else {
                    this.each(function (key, ele) {
                        ele.setAttribute(attr, value);
                    });
                }
            } else if (njQuery.isObject(attr)) {
                // 遍历取出所有属性节点的名称和对应的值，进行设置
                let $this = this;
                $.each(attr, function (key, value) {
                    $this.each(function (k, ele) {
                        ele.setAttribute(key, value);
                    });
                });
            }
        },
        /**
         * 操作属性的方法
         * @param prop 属性，当只传入该参数字符串时，获取该属性的值。若只传入对象，则会对属性批量设置
         * @param value 第二参数，属性设置的值
         * @return {njQuery|*} 返回调用者对象
         */
        prop: function (prop, value) {
            if (njQuery.isString(prop)) {
                if (arguments.length === 1) {
                    return this[0][prop];
                } else {
                    this.each(function (key, ele) {
                        ele[prop] = value;
                    });
                }
            } else if (njQuery.isObject(prop)) {
                // 遍历取出所有属性的名称和对应的值，进行设置
                let $this = this;
                $.each(prop, function (key, value) {
                    $this.each(function (k, ele) {
                        ele[prop] = value;
                    });
                });
            }
            return this;
        },
        /**
         * 操作 css 属性的方法
         * @param styleName css 属性名称，传入单一字符串表示获取 css 熟悉你个名称的值。
         * 传入对象或两个参数，会按照对象属性和值设置 css 的属性和值。
         * @param value 第二参数，css 属性设置的值
         * @return {njQuery|*} 返回调用者对象
         */
        css: function (styleName, value) {
            if (njQuery.isString(styleName)) {
                if (arguments.length === 1) {
                    return njQuery.getStyle(this[0], styleName);
                } else {
                    this.each(function (key, ele) {
                        ele.style[styleName] = value;
                    });
                }
            } else if (njQuery.isObject(styleName)) {
                // 遍历取出所有属性的名称和对应的值，进行设置
                let $this = this;
                $.each(styleName, function (key, value) {
                    $this.each(function (k, ele) {
                        console.log(ele.style);
                        ele.style[key] = value;
                    });
                });
            }
            return this;
        },
        /**
         * 对元素对象的 value 属性进行设置或获取
         * @param content 不传递参数时，获取 value 属性值。传递参数时将 content 值赋值给 value 属性。
         * @return {njQuery|*} 返回调用对象
         */
        val: function (content) {
            if (arguments.length === 0) {
                return this[0].value;
            } else {
                this.each(function (key, ele) {
                    ele.value = content;
                });
            }
            return this;
        },
        /**
         * 判断元素中是否包含指定类
         * @param name 指定的类名，如果不传入任何参数，直接返回 false
         * @return {boolean} 包含指定类名则返回 true，否则返回 false
         */
        hasClass: function (name) {
            let result = false;
            // 不传参数默认返回 false
            if (arguments.length === 0) {
                return result;
            } else {
                this.each(function (key, ele) {
                    let className = " " + ele.className + " ";
                    // name 字符串格式化，前后添加空格
                    name = " " + name.trim() + " ";
                    if (className.indexOf(name) !== -1) {
                        result = true;
                        return false;
                    }
                });
            }

            return result;

        },
        /**
         * 添加指定的一个多个类名
         * @param name 类名字符串，可包含多个类名。不传参数，则对元素不做任何更改
         * @return {njQuery} 返回调用者对象
         */
        addClass: function (name) {
            // 不传参数，也不影响元素
            if (arguments.length === 0) {
                return this;
            } else {
                let names = name.trim().split(" ");
                // 遍历所有元素
                this.each(function (key, ele) {
                    // 遍历类名数组
                    $.each(names, function (k, v) {
                        // 判断元素中是否包含指定的类名
                        if (!$(ele).hasClass(v)) {
                            ele.className += " " + v;
                        }
                        // 规范化一下元素类名，去除两端的空格
                        ele.className = ele.className.trim();
                    });
                });
            }
            // 便于 链式编程
            return this;
        },
        /**
         * 删除元素中指定的一个或多个类名
         * @param name 不传参数时，删除全部类名
         * @return {njQuery} 返回调用的对象
         */
        removeClass: function (name) {
            // 不传参数，删除所有类
            if (arguments.length === 0) {
                this.each(function (key, ele) {
                    if (ele.className === "") return true;
                    ele.className = "";
                });
            } else {
                let names = name.trim().split(" ");
                // 遍历所有元素
                this.each(function (key, ele) {
                    // 遍历类名数组
                    $.each(names, function (k, v) {
                        if (ele.className === "") return true;
                        // 判断元素中是否包含指定的类名
                        if ($(ele).hasClass(v)) {
                            ele.className = " " + ele.className.trim() + " ";
                            ele.className = ele.className.replace(" " + v + " ", " ");
                        }
                        // 规范化一下元素类名，去除两端的空格
                        ele.className = ele.className.trim();
                    });
                });
            }
            // 便于 链式编程
            return this;
        },
        toggleClass: function (name) {
            // 不传参数, 删除所有类
            if (arguments.length === 0 || !name) {
                this.removeClass();
            } else {
                let names = name.trim().split(" ");
                // 遍历所有元素
                this.each(function (key, ele) {
                    // 遍历类名数组
                    $.each(names, function (k, v) {
                        // 判断元素中是否包含指定的类名
                        // 有则删除，没有则添加
                        if ($(ele).hasClass(v)) {
                            $(ele).removeClass(v);
                        } else {
                            $(ele).addClass(v);
                        }
                    });
                });
            }

            // 便于 链式编程
            return this;
        },
    });
    /** jQuery 事件操作相关方法*/
    njQuery.prototype.extend({
        /**
         * 遍历调用对象，绑定 type 事件给每一个元素
         * @param type 事件类型
         * @param callback 触发事件后调用的回调函数
         */
        on: function (type, callback) {
            // 创建一个保存事件对象和对应回调函数的缓存容器
            this.each(function (key, ele) {
                if (!ele.eventsCache) {
                    ele.eventsCache = {};
                }
                // 判断容器内是否有对应事件的回调函数数组
                if (!ele.eventsCache[type]) {
                    // 创建事件对应的对应的回调函数数组队列
                    ele.eventsCache[type] = [];
                    // 将回调函数保存至对应的回调函数数组队列
                    ele.eventsCache[type].push(callback);
                    $.addEvent(ele, type, function (events) {
                        $.each(ele.eventsCache[type], function (k, method) {
                            method(events);
                        });
                    });
                } else {
                    // 将回调函数保存至对应的回调函数数组队列
                    ele.eventsCache[type].push(callback);
                }
            });
        },

        /**
         * 将指定回调函数 callback 从调用者对象的事件中去除
         * @param type 不传参数会将调用对象的所有监听事件移除；
         * 传递一个参数，移除指定的事件类型的所有回调函数
         * 传两个参数，移除对应事件的指定回调函数
         * @param callback
         */
        off: function (type, callback) {
            // 1. 不传参数，移除元素所有事件
            if (arguments.length === 0) {
                this.each(function (key, ele) {
                    ele.eventsCache = {};
                });
            } else if (arguments.length === 1) { /*2. 传递一个参数，移除对应 type 事件类型的 所有对应事件*/
                this.each(function (key, ele) {
                    ele.eventsCache[type] = [];
                });
            } else if (arguments.length === 2) { /*3. 传递两个参数，移除对应 type 事件类型的 callback 对应事件*/
                this.each(function (key, ele) {
                    njQuery.each(ele.eventsCache[type], function (index, method) {
                        // 判断当前遍历到的方法，是否与指定回调函数相同
                        if (method === callback) {
                            ele.eventsCache[type].splice(index, 1);
                        }
                    });
                });
            }
            // return this;
        },
        /**
         * 绑定给 dom 对象一个一次性事件
         * @param type 事件类型
         * @param callback 响应事件回调函数
         * @return {*} 返回调用者 jQuery 对象k
         */
        one: function (type, callback) {
            // 创建一个保存事件对象和对应回调函数的缓存容器
            this.each(function (key, ele) {
                let temp = function (events) {
                    callback(events);
                    $(ele).off(type, temp);
                }
                $(ele).on(type, temp);
            });
        },
    });

    njQuery.prototype.init.prototype = njQuery.prototype;
    window.njQuery = window.$ = njQuery;
})
(window);