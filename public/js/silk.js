/**

Written by the incredibly talented Yuri Vishnevsky.
            http://weavesilk.com

**/

(function () {
    var z, I = {}.hasOwnProperty,
        h = function (a, b) {
            function c() {
                this.constructor = a
            }
            for (var e in b) I.call(b, e) && (a[e] = b[e]);
            c.prototype = b.prototype;
            a.prototype = new c;
            a.__super__ = b.prototype;
            return a
        }, w = [].slice;
    this.socket = io.connect(window.location.origin);
    this.SilkDomain = "http://new.weavesilk.com";
    this.NotYuri = null == localStorage.isYuri;
    this.rand = Math.random;
    this.max = Math.max;
    this.min = Math.min;
    this.abs = Math.abs;
    this.round = Math.round;
    this.floor = Math.floor;
    this.ceil = Math.ceil;
    this.log = Math.log;
    this.pow = Math.pow;
    this.sin = Math.sin;
    this.cos = Math.cos;
    this.sqrt = Math.sqrt;
    this.atan2 = Math.atan2;
    this.Pi = Math.PI;
    this.TwoPi = 2 * Pi;
    this.HalfPi = Pi / 2;
    this.QuarterPi = Pi / 4;
    this.EighthPi = Pi / 8;
    this.E = Math.E;
    this.Epsilon = 1E-4;
    this.Paused = !1;
    this.hexToRGB = function (a) {
        var b, c, e;
        b = /^#?([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i.exec(a)
            .slice(1);
        e = [];
        for (a = c = 0; 2 >= c; a = ++c) e.push(parseInt(b[a], 16));
        return e
    };
    this.brightenRGB = function (a, b, c, e) {
        return [floor(min(255, a + 255 * e)), floor(min(255, b + 255 * e)), floor(min(255, c + 255 * e))]
    };
    this.constrain = function (a, b, c) {
        return a > c ? c : a < b ? b : a
    };
    this.randrange = function (a, b) {
        return a + rand() * (b - a)
    };
    var G;
    G = 0;
    this.autoinc = function () {
        return G++
    };
    this.d = function () {
        return "undefined" !== typeof console && null !== console ? console.log.apply(console, Array.prototype.slice.call(arguments)) : void 0
    };
    this.requestAnimFrame = this.requestAnimationFrame || this.webkitRequestAnimationFrame || this.mozRequestAnimationFrame || this.oRequestAnimationFrame || this.msRequestAnimationFrame || function (a) {
        return this.setTimeout(a, 1E3 / 60)
    };
    this.cancelAnimFrame = this.cancelAnimationFrame || this.webkitCancelAnimationFrame || this.mozCancelAnimationFrame || this.oCancelAnimationFrame || this.msCancelAnimationFrame || this.clearTimeout;
    var l = function (a) {
        this.maxParticles = null != a ? a : 500;
        this.start = this.end = 0;
        this.all = Array(this.maxParticles)
    };
    l.prototype["new"] = function () {
        return {
            age: 0,
            alive: !0
        }
    };
    l.prototype.shouldNotExist = function () {
        return this.start === this.end
    };
    l.prototype.exist = function (a) {
        for (; !(this.start === this.end || this.all[this.start].alive);) this.all[this.start] = null, this.start = this.inc(this.start);
        if (!this.shouldNotExist()) return this.foreach(function (a) {
            a.px = a.x;
            a.py = a.y;
            a.age += 1;
            return this.update(a)
        }), this.drawAll(a)
    };
    l.prototype.drawAll = function (a) {
        var b, c, e, i, g;
        if (!this.shouldNotExist() && ("function" === typeof this.drawStart && this.drawStart(a), this.foreach(function (b) {
            if (b.alive) return this.draw(b, a)
        }), "function" === typeof this.drawEnd && this.drawEnd(a), this.symmetries)) {
            i = this.symmetries;
            g = [];
            c = 0;
            for (e = i.length; c < e; c++) b = i[c], this.foreach(b.trans), "function" === typeof this.drawStart && this.drawStart(a),
            this.foreach(function (b) {
                if (b.alive) return this.draw(b, a)
            }), "function" === typeof this.drawEnd && this.drawEnd(a), g.push(this.foreach(b.inv));
            return g
        }
    };
    l.prototype.foreach = function (a) {
        var b;
        for (b = this.start; b !== this.end;) a.call(this, this.all[b]), b = this.inc(b)
    };
    l.prototype.add = function (a, b) {
        var c, e;
        c = this.inc(this.end);
        this.start === c && (this.start = this.inc(this.start));
        e = this["new"]();
        e.x = a;
        e.y = b;
        this.all[this.end] = e;
        this.end = c;
        return e
    };
    l.prototype.inc = function (a) {
        return (a + 1) % this.maxParticles
    };
    l.prototype.dec = function (a) {
        return (a - 1) % this.maxParticles
    };
    this.Particles = l;
    var k = function () {
        k.__super__.constructor.apply(this, arguments)
    };
    h(k, Particles);
    k.prototype["new"] = function () {
        return $.extend(k.__super__["new"].call(this), {
            r: 255,
            g: 255,
            b: 255,
            maxA: 1,
            radius: 0.75,
            vx: randrange(-1, 1),
            vy: randrange(-1, 0),
            dieAt: 25,
            fadeIn: !1
        })
    };
    k.prototype.update = function (a) {
        var b;
        a.x += a.vx;
        a.y += a.vy;
        b = 1 - a.age / a.dieAt;
        a.a = a.fadeIn ? a.maxA * sin(Pi * b) : b;
        a.color = "rgba(" + a.r + ", " + a.g + ", " + a.b + ", " + a.a + ")";
        return a.alive && (a.alive = a.age < a.dieAt)
    };
    k.prototype.draw = function (a, b) {
        if (a.alive) return b.beginPath(), b.fillStyle = a.color, b.arc(a.x, a.y, a.radius, 0, TwoPi, !1), b.fill(), b.closePath()
    };
    k.prototype.addFromSilk = function (a) {
        var b = this;
        return a.foreach(function (c) {
            var e;
            if (0.03 > rand()) return c = b.add(c.x, c.y), e = a.sparkRGB, c.r = e[0], c.g = e[1], c.b = e[2], e
        })
    };
    k.prototype.addClear = function (a, b, c) {
        var e, i, g, u, j, f;
        null == b && (b = 100);
        null == c && (c = 1);
        i = a.width / 2;
        g = a.height / 2;
        for (f = 1; 1 <= b ? f <= b : f >= b; 1 <= b ? ++f : --f) u = randrange(0, a.width), j = randrange(0,
        a.height), e = atan2(j - g, u - i), e += randrange(-QuarterPi, QuarterPi), j = this.add(u, j), u = 0.25 * c, j.vx = u * cos(e), j.vy = u * sin(e), j.dieAt = randrange(25, 85)
    };
    this.Sparks = k;
    var f = function (a, b, c, e) {
        this.canvas = a;
        this.width = b;
        this.height = c;
        this.seed = e;
        f.__super__.constructor.call(this);
        this.age = 0;
        this.alive = !0;
        this.completed = !1;
        this.drawScale = 1;
        this.setParams(f.defaultParams);
        this.perlin = new PerlinNoise(0);
        this.color = {
            r: 255,
            g: 255,
            b: 255,
            a: 0.07
        };
        this.sparkRGB = [255, 255, 255]
    };
    h(f, Particles);
    f.prototype.setSymmetryTypes = function (a) {
        var b, c, e, i, g = this;
        i = [];
        c = 0;
        for (e = a.length; c < e; c++) switch (b = a[c], b) {
        case "vertical":
            i.push({
                trans: function (a) {
                    return a.x = g.canvas.width - a.x
                }
            });
            break;
        case "horizontal":
            i.push({
                trans: function (a) {
                    return a.y = g.canvas.height - a.y
                }
            });
            break;
        case "diagonal":
            i.push({
                trans: function (a) {
                    a.x = g.canvas.width - a.x;
                    return a.y = g.canvas.height - a.y
                }
            });
            break;
        default:
            i.push(void 0)
        }
        e = this.symmetries = i;
        b = 0;
        for (c = e.length; b < c; b++) a = e[b], null == a.inv && (a.inv = a.trans)
    };
    f.prototype["new"] = function () {
        return $.extend(f.__super__["new"].call(this), {
            accx: 0,
            accy: 0,
            friction: this.friction,
            mass: 1,
            springLength: this.springLength,
            rigidity: this.rigidity,
            death: 250
        })
    };
    f.prototype.add = function (a, b, c, e) {
        var i, g, u;
        g = this.start === this.end;
        i = $(window);
        u = (this.width - i.width()) / 2;
        i = (this.height - i.height()) / 2;
        a = f.__super__.add.call(this, (a - u) * this.drawScale, (b - i) * this.drawScale);
        g || (this.prevParticle.next = a);
        g = this.mouseDamp;
        this.reverseMouseVelocity && (g *= -1);
        a.vmx = c * g;
        a.vmy = e * g;
        return this.prevParticle = a
    };
    f.prototype.shouldNotExist = function () {
        return f.__super__.shouldNotExist.call(this) || !this.alive
    };
    f.prototype.exist = function () {
        f.__super__.exist.apply(this, arguments);
        if (this.completed && (this.color.a -= 5E-4, this.color.a < Epsilon)) return this.die()
    };
    f.prototype.update = function (a) {
        var b, c;
        noiseDetail(this.noiseOctaves, this.noiseFallout);
        c = 2 * TwoPi * noise(a.x * this.noiseScale, a.y * this.noiseScale, this.seed + 0.008 * this.age, this.perlin);
        c *= 2;
        b = Pi / 2;
        (0 !== a.vmx || 0 !== a.vmy) && atan2(a.vmx, a.vmy);
        this.addAngleForce(a, c + b, 1);
        this.addForce(a, a.vmx, a.vmy);
        a.vmx *= 0.99;
        a.vmy *= 0.99;
        a.rigidity *= 0.999;
        this.wind && this.addAngleForce(a, this.windAngle, this.windForce);
        null != a.next && (this.move(a), this.constrain(a));
        return a.alive && (a.alive = a.age < a.death)
    };
    f.prototype.move = function (a) {
        a.x += (a.x - a.px) * a.friction + a.accx;
        a.y += (a.y - a.py) * a.friction + a.accy;
        return a.accx = a.accy = 0
    };
    f.prototype.addForce = function (a, b, c) {
        a.accx += b / a.mass;
        return a.accy += c / a.mass
    };
    f.prototype.addAngleForce = function (a, b, c) {
        c /= a.mass;
        a.accx += c * cos(b);
        return a.accy += c * sin(b)
    };
    f.prototype.addPosition = function (a, b, c) {
        a.x += b;
        return a.y += c
    };
    f.prototype.constrain = function (a) {
        var b, c, e;
        c = a.next.x - a.x;
        e = a.next.y - a.y;
        b = Math.sqrt(c * c + e * e);
        if (0 !== b && (b = 1 - a.springLength / b, c = a.rigidity * c * b, e = a.rigidity * e * b, this.addPosition(a, c, e), null != a.next.next)) return this.addPosition(a.next, - c, - e)
    };
    f.prototype.drawStart = function (a) {
        var b;
        a.beginPath();
        b = this.all[this.start];
        return a.moveTo(b.x * this.drawScale, b.y * this.drawScale)
    };
    f.prototype.draw = function (a, b) {
        var c;
        c = a.next;
        if (null != (null != c ? c.next : void 0)) return b.quadraticCurveTo(a.x * this.drawScale, a.y * this.drawScale, (a.x * this.drawScale + c.x * this.drawScale) / 2, (a.y * this.drawScale + c.y * this.drawScale) / 2)
    };
    f.prototype.drawEnd = function (a) {
        a.lineWidth = this.drawScale;
        a.strokeStyle = "rgba(" + this.color.r + ", " + this.color.g + ", " + this.color.b + ", " + this.color.a + ")";
        a.stroke();
        return a.closePath()
    };
    f.prototype.setParams = function (a) {
        return $.extend(this, a)
    };
    f.prototype.setRGB = function (a, b, c) {
        this.color.r = a;
        this.color.g = b;
        this.color.b = c;
        return this.sparkRGB = brightenRGB(a, b, c, 0.3)
    };
    f.prototype.tick = function () {
        return this.age += 1
    };
    f.prototype.complete = function () {
        return this.completed = !0
    };
    f.prototype.die = function () {
        return this.alive = !1
    };
    f.originalParams = {
        noiseOctaves: 8,
        noiseFallout: 0.65,
        noiseScale: 0.01,
        wind: !1,
        windAngle: -Pi,
        windForce: 0.75,
        friction: 0.975,
        springLength: 0,
        rigidity: 0.3,
        reverseMouseVelocity: !1,
        mouseDamp: 0.2
    };
    f.randomParams = function () {
        return {
            noiseOctaves: randrange(2, 9),
            noiseFallout: randrange(0.25, 1),
            noiseScale: randrange(0.001, 0.1),
            wind: 0.5 > rand(),
            windAngle: randrange(0, TwoPi),
            windForce: randrange(0.5, 1),
            friction: randrange(0, 1),
            springLength: randrange(0,
            20),
            rigidity: randrange(0, 1),
            reverseMouseVelocity: 0.5 > rand(),
            mouseDamp: randrange(0, 1)
        }
    };
    f.defaultParams = f.originalParams;
    f.setDefaultParams = function (a) {
        this.defaultParams = a
    };
    f.resetDefaultParams = function () {
        return this.setDefaultParams(this.originalParams)
    };
    this.Silk = f;
    h = function (a, b, c) {
        var e = this;
        this.silkOne = $(a)[0];
        this.silkTwo = $(b)[0];
        this.silkCanvas = this.silkOne;
        this.bufferCanvas = this.silkTwo;
        this.sparksCanvas = $(c)[0];
        this.silks = {};
        this.time = 0;
        this.pristine = ko.observable(!0);
        this.dirty = ko.observable(!1);
        this.undoState = ko.observable(null);
        this.canUndo = ko.computed(function () {
            return null != e.undoState() && !e.dirty()
        });
        this.tape = new z(this);
        this.replay = new z(this);
        this.sparks = new Sparks;
        this.replayUrl = ko.observable("");
        this.saving = ko.observable(!1);
        this.setRGB("dd4876");
        this.setSymmetryTypes("vertical")
    };
    h.prototype.load = function (a) {
        var b = this;
        $.ajax({
            type: "GET",
            url: "/v1/load",
            data: {
                id: a
            },
            success: function (a) {
                a = JSON.parse(a);
                b.replay = new z(b);
                return b.replay.load(a)
            }
        });
        return this.replayUrl("/?" + a)
    };
    h.prototype.save = function () {
        var a, b = this;
        a = JSON.stringify(this.tape.get());
        $.ajax({
            type: "POST",
            url: "/v1/save",
            data: {
                contents: a
            },
            success: function (a) {
                b.replayUrl("/?" + a);
                return b.saving(!1)
            }
        });
        return this.saving(!0)
    };
    h.prototype.swapSilkCanvii = function () {
        this.silkCanvas === this.silkOne ? (this.bufferCanvas = this.silkOne, this.silkCanvas = this.silkTwo) : (this.silkCanvas = this.silkOne, this.bufferCanvas = this.silkTwo);
        $(this.silkCanvas)
            .insertBefore($(this.bufferCanvas));
        $(this.silkCanvas)
            .addClass("active");
        return $(this.bufferCanvas)
            .removeClass("active")
    };
    h.prototype.add = function (a, b, c, e, i, g) {
        var f;
        null == a && (a = (new Date)
            .getTime());
        null == b && (b = this.rgb);
        null == c && (c = this.symmetryTypes);
        null == e && (e = this.silkCanvas.width);
        null == i && (i = this.silkCanvas.height);
        null == g && (g = randrange(0, 1E6) | 0);
        this.tape.recStart();
        this.tape.rec("add", a, b, c, e, i, g);
        this.silks[a] = new Silk(this.silkCanvas, e, i, g);
        (f = this.silks[a])
            .setRGB.apply(f, b);
        this.silks[a].setSymmetryTypes(c);
        this.dirty(!0);
        this.pristine(!1);
        return a
    };
    h.prototype.addPoint = function (a, b, c, e, i) {
        var g;
        this.tape.rec("addPoint",
        a, b, c, e, i);
        return null != (g = this.silks[a]) ? g.add(b, c, e, i) : void 0
    };
    h.prototype.complete = function (a) {
        var b, c, e;
        if (null != this.silks[a] && !this.silks[a].completed) {
            this.tape.rec("complete", a);
            this.silks[a].complete();
            b = !0;
            e = this.silks;
            for (a in e) if (c = e[a], !c.completed) {
                b = !1;
                break
            }
            if (b && (this.tape.recStop(), 10 < this.tape.time - this.tape.startedTime)) return this.tape.advance(15)
        }
    };
    h.prototype.clear = function () {
        var a, b;
        if (this.dirty()) {
            b = this.tape.eject();
            this.replay.eject();
            this.undoState({
                time: this.time,
                tapeContents: b,
                replayUrl: this.replayUrl()
            });
            this.replayUrl("");
            b = this.silks;
            for (a in b) this.complete(a);
            this.silks = {};
            this.dirty(!1);
            this.time = 0;
            a = this.bufferCanvas.getContext("2d");
            a.clearRect(0, 0, this.bufferCanvas.width, this.bufferCanvas.height);
            $(this.silkCanvas)
                .addClass("hidden");
            $(this.bufferCanvas)
                .removeClass("hidden");
            this.swapSilkCanvii()
        }
        return this.sparks.addClear(this.sparksCanvas, 100)
    };
    h.prototype.undoClear = function () {
        var a;
        if (this.canUndo()) return a = this.undoState(), this.time = a.time, this.tape.load(a.tapeContents),
        this.replayUrl(a.replayUrl), this.undoState(null), this.dirty(!0), $(this.bufferCanvas)
            .removeClass("hidden"), this.swapSilkCanvii(), this.sparks.addClear(this.sparksCanvas, 100, - 1)
    };
    h.prototype.exist = function () {
        var a, b, c, e, i, g;
        c = this.silkCanvas.getContext("2d");
        e = this.sparksCanvas.getContext("2d");
        c.globalCompositeOperation = "lighter";
        g = this.silks;
        for (a in g) if (b = g[a], b.alive) {
            this.sparks.addFromSilk(b);
            for (i = 1; 6 >= i; ++i) b.exist(c);
            b.tick()
        } else delete this.silks[a];
        e.clearRect(0, 0, this.sparksCanvas.width,
        this.sparksCanvas.height);
        this.sparks.exist(e);
        this.replay.play();
        this.tape.recording && this.tape.tick();
        this.replay.tick();
        return this.tick()
    };
    h.prototype.tick = function () {
        return this.time += 1
    };
    h.prototype.setRandomParams = function (a) {
        null == a && (a = Silk.randomParams());
        return Silk.setDefaultParams(a)
    };
    h.prototype.unsetRandomParams = function () {
        return Silk.resetDefaultParams()
    };
    h.prototype.setSymmetryTypes = function () {
        return this.symmetryTypes = 1 <= arguments.length ? w.call(arguments, 0) : []
    };
    h.prototype.setRGB = function (a) {
        return this.rgb = hexToRGB(a)
    };
    this.Silks = h;
    ZeroClipboard.setMoviePath(SilkDomain + "/js/ZeroClipboard.swf");
    this.initControls = function (a, b) {
        var c, e, i, g, f, j, h, B, l, m, s, k, n, q, C, x, y, D, t, A, p, r, v, E;
        B = a.silkOne;
        D = a.silkTwo;
        t = a.sparksCanvas;
        initResizeHandler(B, D, t);
        k = m = t.width / 2;
        n = s = t.height / 2;
        A = p = r = 0;
        l = !1;
        q = null;
        B = !1;
        try {
            (h = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) && (B = !0)
        } catch (J) {
            null != navigator.mimeTypes["application/x-shockwave-flash"] && (B = !0)
        }
        C = function () {
            b.start();
            l = !0;
            q = a.add();
            b.playDrawSound();
            j.ui.replayUrl("");
            NotYuri && _StatHat.push(["_trackCount", "utcX8h5dLTDi6J_uiOyh-CBMdkNN", 1]);
            return !1
        };
        c = $(t);
        x = function (a) {
            var b, e;
            b = c.offset();
            e = b.left;
            b = b.top;
            m = a.pageX - e;
            return s = a.pageY - b
        };
        y = function () {
            l = !1;
            a.complete(q);
            return b.stopDrawSound()
        };
        $(document)
            .mouseup(function (a) {
            if (1 === a.which) return y()
        });
        // $(t)
        //     .mousedown(function (a) {
        //     if (1 === a.which) return C()
        // })
        //     .mousemove(function (a) {
        //     return x(a)
        // })
        //     .mouseup(function (a) {
        //     if (1 === a.which) return y()
        // })
        this.socket
            .on("touchstart", function (a) {
            x(a);
            k = m;
            n = s;
            C();
            return !1
        })
            .on("touchmove", function (a) {
            x(a);
            return !1
        })
            .on("touchend", function () {
            y();
            return !1
        });
        j = {
            exist: function () {
                var b;
                l ? (a.addPoint(q, m, s, m - k, s - n), p = k - m, r = n - s, b = p * p + r * r, A = 0 < b ? sqrt(b) : 0) : p = r = A = 0;
                k = m;
                return n = s
            },
            vmouse: function () {
                return A
            },
            ui: {
                pristine: a.pristine,
                dirty: a.dirty,
                canUndo: a.canUndo,
                replayUrl: a.replayUrl,
                saving: a.saving,
                canClip: B,
                clipText: ko.observable("Copy link"),
                emailUrl: ko.computed(function () {
                    return "mailto:?subject=Silk&body=" + (SilkDomain + a.replayUrl())
                }),
                fbUrl: ko.computed(function () {
                    var b;
                    b = SilkDomain + a.replayUrl();
                    return ["https://www.facebook.com/dialog/feed?&app_id=408271179236250", "link=" + b, "picture=" + SilkDomain + "/img/fb_share_thumb.jpg", "name=Silk&caption=&description=Create beautiful art with Silk, an interactive generative artwork.", "redirect_uri=" + b].join("&")
                }),
                twitterUrl: ko.computed(function () {
                    return "https://twitter.com/share?url=" + SilkDomain + a.replayUrl()
                }),
                muteMusic: b.muteMusic,
                muteSound: b.muteSound,
                symmetry: ko.observable(""),
                color: ko.observable(""),
                setColor: function (a) {
                    j.ui.color(a);
                    return b.blip()
                },
                setSymmetry: function (a) {
                    return j.ui.symmetry(a)
                },
                share: function () {
                    NotYuri && _StatHat.push(["_trackCount", "v8jIQgxhDwLnEGQqohjegiB4SWtl", 13]);
                    return a.save()
                },
                clear: function () {
                    a.clear();
                    q = null;
                    b.playClearSound();
                    return refreshCarbonAd()
                },
                undo: function () {
                    b.blip(1.25);
                    return a.undoClear()
                },
                randomize: function () {
                    return a.setRandomParams()
                },
                unrandomize: function () {
                    return a.unsetRandomParams()
                },
                toggleMusic: function () {
                    return b.muteMusic() ? b.setMuteMusic(!1) : b.setMuteMusic(!0)
                },
                toggleSound: function () {
                    if (b.muteSound()) return b.setMuteMusic(!1), b.setMuteEffects(!1);
                    b.setMuteMusic(!0);
                    return b.setMuteEffects(!0)
                },
                bloop: function () {
                    return b.bloop()
                }
            }
        };
        e = new ZeroClipboard.Client;
        e.glue("copy-to-clipboard", "copy-to-clipboard-wrap");
        a.replayUrl.subscribe(function (a) {
            return e.setText(SilkDomain + a)
        });
        e.addEventListener("onMouseOver", function () {
            return j.ui.clipText("Copy link")
        });
        e.addEventListener("onComplete", function () {
            return j.ui.clipText("Copied.")
        });
        f = {
            blue: "#3d95cc",
            green: "#53BD39",
            yellow: "#E3BF30",
            orange: "#EB5126",
            pink: "#dd4876",
            grey: "#555555"
        };
        g = ko.computed(function () {
            return f[j.ui.color()]
        });
        j.ui.color.subscribe(function (b) {
            sessionStorage.colorName = b;
            g = f[b];
            a.setRGB(g);
            return $("#colors")
                .css("background-color", g)
        });
        for (i in f) h = f[i], $("#colors ." + i)
            .css("background", h);
        j.ui.symmetry.subscribe(function (b) {
            sessionStorage.symmetryKind = b;
            switch (b) {
            case "none":
                return a.setSymmetryTypes();
            case "vertical":
                return a.setSymmetryTypes("vertical");
            case "both":
                return a.setSymmetryTypes("horizontal", "vertical", "diagonal")
            }
        });
        j.ui.color(null != (v = sessionStorage.colorName) ? v : "blue");
        j.ui.symmetry(null != (E = sessionStorage.symmetryKind) ? E : "vertical");
        key("x, space", function () {
            return j.ui.clear()
        });
        key("u", function () {
            return j.ui.undo()
        });
        return j
    };
    this.initResizeHandler = function () {
        var a, b;
        a = 1 <= arguments.length ? w.call(arguments, 0) : [];
        b = function () {
            var b, e, i, g, f, j, h;
            h = [];
            f = 0;
            for (j = a.length; f < j; f++) b = a[f], e = b.getContext("2d"), g = b.width, i = b.height, i = e.getImageData(0,
            0, g - 1, i - 1), b.width = $(window)
                .width(), b.height = $(window)
                .height(), e = b.getContext("2d"), h.push(e.putImageData(i, 0, 0));
            return h
        };
        b();
        return $(window)
            .resize(b)
    };
    h = function (a) {
        this.source = a;
        this.load({})
    };
    h.prototype.recStart = function () {
        this.recording = !0;
        return this.startedTime = this.time
    };
    h.prototype.rec = function () {
        var a, b, c;
        a = 1 <= arguments.length ? w.call(arguments, 0) : [];
        if (this.recording) {
            if (null == (b = this.tape)[c = this.time]) b[c] = [];
            return this.tape[this.time].push(a)
        }
        return d("Error: Not recording.", a)
    };
    h.prototype.recStop = function () {
        return this.recording = !1
    };
    h.prototype.advance = function (a) {
        return this.time += a
    };
    h.prototype.play = function () {
        var a, b, c, e, i, f;
        if (this.time in this.tape) {
            i = this.tape[this.time];
            c = 0;
            for (e = i.length; c < e; c++) a = i[c], b = a[0], a = 2 <= a.length ? w.call(a, 1) : [], (f = this.source)[b].apply(f, a)
        }
    };
    h.prototype.tick = function () {
        return this.time += 1
    };
    h.prototype.load = function (a) {
        this.tape = a;
        return this.time = 0
    };
    h.prototype.get = function () {
        return this.tape
    };
    h.prototype.eject = function () {
        var a;
        a = this.tape;
        this.load({});
        return a
    };
    z = h;
    this.initAudio = function () {
        var a, b, c, e, f, g, h, j, k, l, z, m, s, w, n, q, C, x, y, D, t, A;
        this.audioContext = this.audioContext || this.webkitAudioContext;
        var p = function (a, b) {
            this.buffer = a;
            this.ctx = b;
            this.setLoop(!1);
            this.setVolume(1)
        };
        p.prototype.setLoop = function (a) {
            this.loop = a
        };
        p.prototype.setVolume = function (a) {
            this.gain = a
        };
        p.prototype.createSource = function () {
            this.source = this.ctx.createBufferSource();
            this.source.buffer = this.buffer;
            this.source.loop = this.loop;
            this.source.gain.value = this.gain;
            return this.source.connect(this.ctx.destination)
        };
        p.prototype.play = function () {
            var a;
            return null != (a = this.source) ? a.noteOn(0) : void 0
        };
        p.prototype.fadeTo = function (a, b) {
            var c;
            this.gain = a;
            c = this.ctx.currentTime;
            this.source.gain.cancelScheduledValues(c);
            this.source.gain.setValueAtTime(this.source.gain.value, c);
            return this.source.gain.linearRampToValueAtTime(this.gain, c + b)
        };
        p.prototype.trigger = function (a) {
            var b, c;
            null == a && (a = 1);
            b = this.triggerSource;
            this.triggerSource = this.triggerSourceBk;
            this.triggerSourceBk = b;
            null != (c = this.triggerSource) && c.noteOff(0);
            this.triggerSource = this.ctx.createBufferSource();
            this.triggerSource.buffer = this.buffer;
            this.triggerSource.loop = this.loop;
            this.triggerSource.gain.value = this.gain * a;
            this.triggerSource.connect(this.ctx.destination);
            return this.triggerSource.noteOn(0)
        };
        A = function (a) {
            return "audio/" + escape(a)
        };
        s = function (a, b, c, e) {
            var f;
            f = new XMLHttpRequest;
            f.open("GET", a, !0);
            f.responseType = "arraybuffer";
            f.onload = function () {
                return b.decodeAudioData(f.response, function (a) {
                    return "function" === typeof c ? c(a) : void 0
                }, function () {
                    return "function" === typeof e ? e(req, a) : void 0
                })
            };
            return f.send()
        };
        if (null != this.audioContext) {
            g = new this.audioContext;
            m = function (a, b) {
                var c;
                c = A(a);
                return s(c, g, function (a) {
                    a = new p(a, g);
                    return b(a)
                })
            };
            var r, v, E;
            r = [];
            E = function (a) {
                a.setVolume(0.27);
                r.push(a);
                return 4 === r.length
            };
            m("Clear 1 16-44.m4a", E);
            v = 1;
            x = function () {
                var a;
                0 < v && (a = floor(randrange(0, r.length)), r[a].trigger());
                if (4 > v) return m("Clear " + (v + 1) + " 16-44.m4a", E), v += 1
            };
            j = null;
            m("Sparks 16-44 -looped.m4a", function (a) {
                j = a;
                j.setVolume(0);
                j.setLoop(!0);
                j.createSource();
                return j.play()
            });
            k = null;
            m("Draw B2 2048 loop.m4a", function (a) {
                k = a;
                k.setVolume(0);
                k.setLoop(!0);
                k.createSource();
                return k.play()
            });
            l = !1;
            y = function () {
                l = !0;
                null != j && j.fadeTo(0.02, 0.5);
                return null != k ? k.fadeTo(0.15, 0.5) : void 0
            };
            t = function () {
                l = !1;
                null != j && j.fadeTo(0, 1);
                return null != k ? k.fadeTo(0, 1) : void 0
            };
            w = function (a) {
                if (l) return a = log(log(a * (1 / 30) + 1)), a = constrain(a, 0.15, 0.6), null != k ? k.fadeTo(a, 0.2) : void 0
            };
            e = null;
            m("Palette A5.m4a", function (a) {
                e = a;
                return e.setVolume(0.4)
            });
            f = null;
            m("Palette A4.m4a", function (a) {
                f = a;
                return f.setVolume(0.3)
            })
        }
        q = ko.observable(null != localStorage.getItem("muteMusic"));
        n = ko.observable(null != localStorage.getItem("muteEffects"));
        C = ko.computed(function () {
            return q() && n()
        });
        D = !1;
        a = $("#bg-music")[0];
        b = $("#bg-music-intro")[0];
        c = !1;
        z = function () {
            a.volume = 0;
            a.play();
            return setTimeout(function () {
                var b;
                return b = setInterval(function () {
                    a.volume += 0.5 / 150;
                    a.volume = min(a.volume, 0.5) + 0.01;
                    if (0.5 <= a.volume) return clearInterval(b)
                }, 100)
            }, 500)
        };
        return h = {
            muteMusic: q,
            muteSound: C,
            setMuteMusic: function (c) {
                q(c);
                c ? localStorage.setItem("muteMusic", !0) : (localStorage.removeItem("muteMusic"), h.setMuteEffects(!1), h.start());
                b.muted = c;
                return a.muted = c
            },
            setMuteEffects: function (a) {
                n(a);
                return a ? localStorage.setItem("muteEffects", !0) : localStorage.removeItem("muteEffects")
            },
            start: function () {
                var e;
                if (!D && !q()) return D = !0, e = setInterval(function () {
                    var f;
                    f = 0 < a.buffered.length && 10 < a.buffered.end(0);
                    0 < b.buffered.length && 2 < b.buffered.end(0) && !c && (b.volume = 0.55, b.play(), c = !0);
                    if (f) return clearInterval(e),
                    z()
                }, 100)
            },
            playClearSound: function () {
                if (!n()) return "function" === typeof x ? x() : void 0
            },
            playDrawSound: function () {
                if (!n()) return "function" === typeof y ? y() : void 0
            },
            stopDrawSound: function () {
                if (!n()) return "function" === typeof t ? t() : void 0
            },
            modulateDrawSound: function (a) {
                return "function" === typeof w ? w(a) : void 0
            },
            blip: function (a) {
                if (!n()) return null != e ? e.trigger(a) : void 0
            },
            bloop: function (a) {
                if (!n()) return null != f ? f.trigger(a) : void 0
            }
        }
    };
    var F, H;
    H = function () {
        return (new Date)
            .getTime() / 1E3
    };
    F = 0;
    this.refreshCarbonAd = function () {
        var a, b;
        a = H();
        if (30 < a - F) return F = a, $(".carbonad")
            .html('<div id="azcarbon"></div>'), b = document.createElement("script"), b.type = "text/javascript", b.async = !0, b.src = "http://engine.carbonads.com/z/17908/azcarbon_2_1_0_HORIZDARK", a = document.getElementsByTagName("script")[0], a.parentNode.insertBefore(b, a)
    };
    $(function () {
        var a, b, c, e, f, g, h;
        h = new Silks("#silk-1", "#silk-2", "#sparks");
        a = initAudio();
        b = initControls(h, a);
        f = document.location.href.indexOf("?"); - 1 < f ? (g = document.location.href.indexOf("&"),
        e = document.location.href.substring(f + 1), - 1 < g && (e = e.substring(0, g - f - 1)), d("Loading silk", e), h.load(e)) : refreshCarbonAd();
        c = function () {
            b.exist();
            h.exist();
            a.modulateDrawSound(b.vmouse());
            return requestAnimFrame(c)
        };
        c();
        return ko.applyBindings(b.ui, $("#body")[0])
    })
})
    .call(this);