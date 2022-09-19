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
        Commands\PaidRemainderCron::class,
        Commands\UnPaidRemainderCron::class,
        Commands\AllRemainderCron::class,
       
    ];
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('unPaidRemainder:cron')
        ->everyMinute()
        ->runInBackground()
        ->withoutOverlapping()
        ->onOneServer();

        $schedule->command('paidRemainder:cron')
        ->everyMinute()
        ->runInBackground()
        ->withoutOverlapping()
        ->onOneServer();

        $schedule->command('allRemainder:cron')
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
