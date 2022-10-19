<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Code extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function characteristics(){
        return $this->hasMany(Characteristic::class);
    }
}
