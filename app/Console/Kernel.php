<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected $commands = [
        Commands\PaidReminderCron::class,
        Commands\UnPaidReminderCron::class,
        Commands\AllReminderCron::class,
       
    ];
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('unPaidReminder:cron')
        ->everyMinute()
        ->runInBackground()
        ->withoutOverlapping()
        ->onOneServer();

        $schedule->command('paidReminder:cron')
        ->everyMinute()
        ->runInBackground()
        ->withoutOverlapping()
        ->onOneServer();

        $schedule->command('allReminder:cron')
        ->everyMinute()
        ->runInBackground()
        ->withoutOverlapping()
        ->onOneServer();
    }
    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
