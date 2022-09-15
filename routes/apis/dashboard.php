<?php

use App\Http\Controllers\Api\DashboardController;


Route::post('invoice-summmary', [DashboardController::class, 'getInvoiceSummmary']);
Route::post('invoice-stats', [DashboardController::class, 'getInvoiceStats']);
Route::post('team-progress', [DashboardController::class, 'getTeamProgress']);

