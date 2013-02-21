if( typeof define === "function" )
{
	define( "puremvc_async", ['puremvc'], function(puremvc)
	{
        var __extends = this.__extends || function (d, b) {
            function __() { this.constructor = d; }
            __.prototype = b.prototype;
            d.prototype = new __();
        };
        var puremvc_async;
        (function (puremvc_async) {
            "use strict";
            var AsyncCommand = (function (_super) {
                __extends(AsyncCommand, _super);
                function AsyncCommand() {
                    _super.apply(this, arguments);
        
                }
                AsyncCommand.prototype.setOnComplete = function (value) {
                    this.onComplete = value;
                };
                AsyncCommand.prototype.commandComplete = function () {
                    this.onComplete();
                };
                return AsyncCommand;
            })(puremvc.SimpleCommand);
            puremvc_async.AsyncCommand = AsyncCommand;    
        })(puremvc_async || (puremvc_async = {}));
        var puremvc_async;
        (function (puremvc_async) {
            "use strict";
            var AsyncMacroCommand = (function (_super) {
                __extends(AsyncMacroCommand, _super);
                function AsyncMacroCommand() {
                        _super.call(this);
                    this.subCommands = null;
                    this.subCommands = new Array();
                    this.initializeMacroCommand();
                }
                AsyncMacroCommand.prototype.initializeMacroCommand = function () {
                };
                AsyncMacroCommand.prototype.addSubCommand = function (commandClassRef) {
                    this.subCommands.push(commandClassRef);
                };
                AsyncMacroCommand.prototype.setOnComplete = function (value) {
                    this.onComplete = value;
                };
                AsyncMacroCommand.prototype.execute = function (notification) {
                    this.note = notification;
                    this.nextCommand();
                };
                AsyncMacroCommand.prototype.nextCommand = function () {
                    if(this.subCommands.length > 0) {
                        var commandClassRef = this.subCommands.shift();
                        var commandInstance = new commandClassRef();
                        var isAsync = commandInstance instanceof puremvc_async.AsyncCommand;
                        if(isAsync) {
                            (commandInstance).setOnComplete(this.nextCommand.bind(this));
                        }
                        (commandInstance).execute(this.note);
                        if(!isAsync) {
                            this.nextCommand();
                        }
                    } else {
                        if(this.onComplete) {
                            this.onComplete();
                        }
                        this.note = null;
                        this.onComplete = null;
                    }
                };
                return AsyncMacroCommand;
            })(puremvc.Notifier);
            puremvc_async.AsyncMacroCommand = AsyncMacroCommand;    
        })(puremvc_async || (puremvc_async = {}));
        
		return puremvc_async;
	});
}