<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddonType extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    
    public function addons(){
        return $this->hasMany(AddOn::class);
    }
}
