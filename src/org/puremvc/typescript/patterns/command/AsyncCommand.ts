///<reference path='../../../../../../test/lib/puremvc-typescript-standard-1.0.d.ts'/>

/*
 PureMVC Utility for AS3 - AsyncCommand
 Copyright(c) 2008 Duncan Hall <duncan.hall@puremvc.org>
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
module puremvc_async
{
	"use strict";
	/**
	 * A base <code>IAsyncCommand</code> implementation.
	 * 
	 * <P>
	 * Your subclass should override the <code>execute</code> 
	 * method where your business logic will handle the <code>INotification</code>. </P>
	 * 
	 * @see org.puremvc.as3.patterns.command.AsyncMacroCommand AsyncMacroCommand
	 */
	export class AsyncCommand extends puremvc.SimpleCommand	implements IAsyncCommand
	{
		
		/**
		 * Registers the callback for a parent <code>AsyncMacroCommand</code>.  
		 * 
		 * @param value	The <code>AsyncMacroCommand</code> method to call on completion
		 */
		public setOnComplete ( value:Function ) : void 
		{ 
			this.onComplete = value; 
		}
		
		
		/**
		 * Notify the parent <code>AsyncMacroCommand</code> that this command is complete.
		 * <P>
		 * Call this method from your subclass to signify that your asynchronous command
		 * has finished.
		 */
		commandComplete () : void
		{
			this.onComplete();
		}
		
		private onComplete	:	Function;
	}
}
