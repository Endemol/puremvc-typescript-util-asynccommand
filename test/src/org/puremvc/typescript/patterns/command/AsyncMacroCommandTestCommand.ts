///<reference path='../../../../../../../test/lib/puremvc-typescript-standard-1.0.d.ts'/>
///<reference path='../../../../../../../bin/utility-typescript-standard-asynccommand-1.0.d.ts'/>

///<reference path='MacroCommandTestSub2Command.ts'/>
///<reference path='AsyncMacroCommandTestSub1AsyncCommand.ts'/>

module test
{
	"use strict";

	/**
	 * A AsyncMacroCommand subclass used by AsyncMacroCommandTest.
	 */
	export class AsyncMacroCommandTestCommand
		extends puremvc_async.AsyncMacroCommand
		implements puremvc.ICommand
	{
		/**
		 * Initialize the MacroCommandTestCommand by adding
		 * its 2 SubCommands.
		 *
		 * @override
		 */
        initializeMacroCommand()
        {
            console.log("MacroCommandTestCommand.initializeMacroCommand")
            this.addSubCommand( AsyncMacroCommandTestSub1AsyncCommand );
            this.addSubCommand( MacroCommandTestSub2Command );
        }
	}
}