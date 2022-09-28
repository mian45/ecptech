<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VisionPlan extends Model
{
    use HasFactory;

    public function lensetypes(){
        return $this->hasMany(LenseType::class);
    }
}
