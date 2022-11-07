<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CollectionPermission extends Model
{
    use HasFactory;
    
    protected $table = 'collections_permissions';
    protected $guarded = ['id'];
}
