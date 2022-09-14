<?php
use App\Http\Controllers\Api\InvoicesController;

Route::get('invoices', [InvoicesController::class, 'index']);
Route::post('search_invoices', [InvoicesController::class, 'search']);