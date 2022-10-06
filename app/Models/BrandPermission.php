<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BrandPermission extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'lense_type_id',
        'brand_id',
        'status'
    ];
}
