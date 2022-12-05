<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class TracingFee extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'tracing_fee';
    protected $fillable = [
        'name',
        'value',
        'user_id',
        'status'
    ];
}
