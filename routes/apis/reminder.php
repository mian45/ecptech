<?php

use App\Http\Controllers\Api\ReminderController;

    Route::get('get-time-zone', [ReminderController::class, 'getTimeZone']);
    Route::get('get-reminders', [ReminderController::class, 'getReminders']);
    Route::post('add-reminder', [ReminderController::class, 'addReminder']);
    Route::post('edit-reminder', [ReminderController::class, 'editReminder']);
    Route::post('active-inactive-reminder', [ReminderController::class, 'activeInactiveReminder']);
    Route::post('delete-reminder', [ReminderController::class, 'deleteReminder']);
