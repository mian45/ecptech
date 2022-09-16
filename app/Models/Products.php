<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Products extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $fillable = [        
        'user_id',
        'name',
        'price',
        'created_at',
        'updated_at'
    ];
}
