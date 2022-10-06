<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddonExtra extends Model
{
    use HasFactory;
    protected $guarded =['id'];
    protected $table = 'addon_extra';

    public function addon(){
        return $this->belongsTo(AddOn::class);
    }

}
