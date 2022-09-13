<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Prescription extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $fillable = [
        'name',
        'sphere_from',
        'sphere_to',
        'cylinder_from',
        'cylinder_from',
        'cylinder_to',
        'user_id',
        'deleted_at',
        'created_at',
        'updated_at'
    ];
}
