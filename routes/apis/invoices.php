<?php
use App\Http\Controllers\Api\InvoicesController;

Route::get('get-invoices', [InvoicesController::class, 'index']);
Route::post('search-invoices', [InvoicesController::class, 'search']);
Route::get('view-invoice', [InvoicesController::class, 'viewInvoice']);
Route::post('save-invoice', [InvoicesController::class, 'saveInvoice']);
Route::post('save-edit-invoice', [InvoicesController::class, 'saveEditInvoice']);

Route::post('download-pdf', [InvoicesController::class, 'downloadPDF']);