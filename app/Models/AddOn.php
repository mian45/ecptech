<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddOn extends Model
{
    use HasFactory;
    protected $table = 'addons';

    protected $guarded = ['id'];

    public function addon_type(){
        return $this->belongsTo(AddonType::class);
    }

    public function addon_extra(){
        return $this->hasMany(AddonExtra::class,'addon_id');
    }

    

}
