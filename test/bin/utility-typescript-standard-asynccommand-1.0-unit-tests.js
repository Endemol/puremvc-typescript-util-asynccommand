if( typeof define === "function" )
{
	define( "test", ['YUITest','puremvc','puremvc_async'], function(YUITest,puremvc,puremvc_async)
	{
        var test;
        (function (test) {
            "use strict";
            var MacroCommandTestVO = (function () {
                function MacroCommandTestVO(input) {
                    this.input = null;
                    this.result1 = null;
                    this.result2 = null;
                    this.input = input;
                }
                return MacroCommandTestVO;
            })();
            test.MacroCommandTestVO = MacroCommandTestVO;    
        })(test || (test = {}));
        var __extends = this.__extends || function (d, b) {
            function __() { this.constructor = d; }
            __.prototype = b.prototype;
            d.prototype = new __();
        };
        var test;
        (function (test) {
            "use strict";
            var MacroCommandTestSub2Command = (function (_super) {
                __extends(MacroCommandTestSub2Command, _super);
                function MacroCommandTestSub2Command() {
                    _super.apply(this, arguments);
        
                }
                MacroCommandTestSub2Command.prototype.execute = function (notification) {
                    var vo = notification.getBody();
                    vo.result2 = vo.input * vo.input;
                };
                return MacroCommandTestSub2Command;
            })(puremvc.SimpleCommand);
            test.MacroCommandTestSub2Command = MacroCommandTestSub2Command;    
        })(test || (test = {}));
        var test;
        (function (test) {
            "use strict";
            var AsyncMacroCommandTestSub1AsyncCommand = (function (_super) {
                __extends(AsyncMacroCommandTestSub1AsyncCommand, _super);
                function AsyncMacroCommandTestSub1AsyncCommand() {
                    _super.apply(this, arguments);
        
                }
                AsyncMacroCommandTestSub1AsyncCommand.prototype.execute = function (notification) {
                    var vo = notification.getBody();
                    console.log("[CMD] AsyncMacroCommandTestSub1AsyncCommand -> " + vo.input);
                    vo.result1 = 2 * vo.input;
                    this.commandComplete();
                };
                return AsyncMacroCommandTestSub1AsyncCommand;
            })(puremvc_async.AsyncCommand);
            test.AsyncMacroCommandTestSub1AsyncCommand = AsyncMacroCommandTestSub1AsyncCommand;    
        })(test || (test = {}));
        var test;
        (function (test) {
            "use strict";
            var AsyncMacroCommandTestCommand = (function (_super) {
                __extends(AsyncMacroCommandTestCommand, _super);
                function AsyncMacroCommandTestCommand() {
                    _super.apply(this, arguments);
        
                }
                AsyncMacroCommandTestCommand.prototype.initializeMacroCommand = function () {
                    console.log("MacroCommandTestCommand.initializeMacroCommand");
                    this.addSubCommand(test.AsyncMacroCommandTestSub1AsyncCommand);
                    this.addSubCommand(test.MacroCommandTestSub2Command);
                };
                return AsyncMacroCommandTestCommand;
            })(puremvc_async.AsyncMacroCommand);
            test.AsyncMacroCommandTestCommand = AsyncMacroCommandTestCommand;    
        })(test || (test = {}));
        var test;
        (function (test) {
            "use strict";
            var AsyncMacroCommandTest = (function () {
                function AsyncMacroCommandTest() {
                    this.name = "PureMVC Util AsyncCommand - AsyncMacroCommmand class tests";
                }
                AsyncMacroCommandTest.prototype.testAsyncMacroCommandExecute = function () {
                    var vo = new test.MacroCommandTestVO(5);
                    var notification = new puremvc.Notification('AsyncMacroCommandTest', vo);
                    var command = new test.AsyncMacroCommandTestCommand();
                    command.execute(notification);
                    YUITest.Assert.areEqual(10, vo.result1, "Expecting vo.result1 == 10");
                    YUITest.Assert.areEqual(25, vo.result2, "Expecting vo.result2 == 25");
                };
                return AsyncMacroCommandTest;
            })();
            test.AsyncMacroCommandTest = AsyncMacroCommandTest;    
        })(test || (test = {}));
        
		return test;
	});
}