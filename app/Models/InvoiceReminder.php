<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class InvoiceReminder extends Model
{
    
    use HasFactory, SoftDeletes;
    protected $table ='invoice_reminder';
}
