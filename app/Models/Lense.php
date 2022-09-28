<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lense extends Model
{
    use HasFactory;

    protected $guarded =['id'];


    public function collection(){
        return $this->belongsTo(Collection::class);
    }

    public function lensmaterial(){
        return $this->belongsTo(LensMaterial::class);
    }

    public function characteristics(){
        return $this->hasMany(Characteristic::class);
    }

    
}
