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
	 * A base <code>ICommand</code> implementation that executes other 
	 * <code>ICommand</code>s asynchronously.
	 *  
	 * <P>
	 * An <code>AsyncMacroCommand</code> maintains a list of
	 * <code>ICommand</code> Class references called <i>SubCommands</i>.</P>
	 * 
	 * <P>
	 * When <code>execute</code> is called, the <code>AsyncMacroCommand</code>
	 * caches a reference to the <code>INotification</code> and calls 
	 * <code>nextCommand</code>.</P>
	 * 
	 * <P>
	 * If there are still <i>SubCommands</i>'s to be executed, 
	 * the <code>nextCommand</code> method instantiates and calls <code>execute</code> 
	 * on each of its <i>SubCommands</i> in turn. Each <i>SubCommand</i> will be passed 
	 * a reference to the original <code>INotification</code> that was passed to the 
	 * <code>AsyncMacroCommand</code>'s <code>execute</code> method. If the
	 * <i>SubCommand</i> to execute is an <code>IAsyncCommand</code>, the 
	 * next <i>SubCommand</i> will not be executed until the previous 
	 * <code>IAsyncCommand</code> has called its <i>commandComplete</i> method.</P>
	 * 
	 * <P>
	 * Unlike <code>AsyncCommand</code> and <code>SimpleCommand</code>, your subclass
	 * should not override <code>execute</code>, but instead, should 
	 * override the <code>initializeAsyncMacroCommand</code> method, 
	 * calling <code>addSubCommand</code> once for each <i>SubCommand</i>
	 * to be executed.</P>
	 * 
	 * @see org.puremvc.as3.patterns.command.AsyncCommand AsyncCommand
	 */
	export class AsyncMacroCommand
           extends puremvc.Notifier
           implements IAsyncCommand,puremvc.ICommand, puremvc.INotifier
	{
		private  subCommands	:	Function[] = null;
		private  note			:	puremvc.INotification;
		private  onComplete		:	Function;
		/**
		 * Constructor. 
		 * 
		 * <P>
		 * You should not need to define a constructor, 
		 * instead, override the <code>initializeAsyncMacroCommand</code>
		 * method.</P>
		 * 
		 * <P>
		 * If your subclass does define a constructor, be 
		 * sure to call <code>super()</code>.</P>
		 */
        constructor()
        {
            super();

            this.subCommands = new Function[]();
            this.initializeMacroCommand();
        }
	
		/**
		 * Initialize the <code>AsyncMacroCommand</code>.
		 * 
		 * <P>
		 * In your subclass, override this method to 
		 * initialize the <code>AsyncMacroCommand</code>'s <i>SubCommand</i>  
		 * list with <code>ICommand</code> class references.
		 * </P>
		 * 
		 * <listing>
		 *		// Initialize MyMacroCommand
		 *		override protected function initializeAsyncMacroCommand() : void
		 *		{
		 *			addSubCommand( com.me.myapp.controller.FirstCommand );
		 *			addSubCommand( com.me.myapp.controller.SecondCommand );
		 *			addSubCommand( com.me.myapp.controller.ThirdCommand );
		 *		}
		 * </listing>
		 * 
		 * <P>
		 * Note that <i>SubCommand</i>s may be any <code>ICommand</code> implementor,
		 * <code>AsyncMacroCommand</code>s, <code>AsyncCommand</code>s, 
		 * <code>MacroCommand</code>s or <code>SimpleCommands</code> are all acceptable.
		 */
         initializeMacroCommand():void {}
	
		/**
		 * Add a <i>SubCommand</i>.
		 * 
		 * <P>
		 * The <i>SubCommands</i> will be called in First In/First Out (FIFO)
		 * order.</P>
		 * 
		 * @param commandClassRef a reference to the <code>Class</code> of the <code>ICommand</code>.
		 */
		addSubCommand( commandClassRef:Function ): void
		{
			this.subCommands.push(commandClassRef);
        }
				
		/**
		 * Registers the callback for a parent <code>AsyncMacroCommand</code>.  
		 * 
		 * @param value		The <code>AsyncMacroCommand</code> method to call on completion
		 */
		setOnComplete ( value:Function ) : void { this.onComplete = value; }
		
		
		/** 
		 * Starts execution of this <code>AsyncMacroCommand</code>'s <i>SubCommands</i>.
		 * <P>
		 * The <i>SubCommands</i> will be called in First In/First Out (FIFO) order.
		 * </P> 
		 * 
		 * @param notification the <code>INotification</code> object to be passsed to each <i>SubCommand</i>.
		 */
		execute( notification:puremvc.INotification ) : void
		{
			this.note = notification;
			this.nextCommand();
		}


					
		/** 
		 * Execute this <code>AsyncMacroCommand</code>'s next <i>SubCommand</i>.
		 * 
		 * <P>
		 * If the next <i>SubCommand</i> is asynchronous, a callback is registered for
		 * the command completion, else the next command is run.</P>  
		 */					
		private nextCommand () : void
		{
			if (this.subCommands.length > 0)
			{
				/*
				 * Typed any here instead of <code>Function</code> ( won't compile if set to Function
				 * because today the compiler consider that <code>Function</code> is not newable and
				 * doesn't have a <code>Class</code> type)
				 */
				var commandClassRef:any			=	this.subCommands.shift();
				var commandInstance:any			=	new commandClassRef();
				var isAsync:bool       		    =	commandInstance instanceof AsyncCommand;
				

				if (isAsync) (<IAsyncCommand> commandInstance ).setOnComplete(  this.nextCommand.bind(this));
                (<puremvc.ICommand> commandInstance ).execute( this.note );
				if (!isAsync) this.nextCommand();
			}
			else
			{
				if(this.onComplete) this.onComplete();
				
				this.note 		=	null;
				this.onComplete	=	null;
			}
		}
	}
}