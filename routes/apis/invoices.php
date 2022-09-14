<?php
use App\Http\Controllers\Api\InvoicesController;

Route::get('invoices', [InvoicesController::class, 'index']);
Route::post('search-invoices', [InvoicesController::class, 'search']);