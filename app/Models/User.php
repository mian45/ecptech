<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\LenseType;
use App\Models\UserLenseMaterialSetting;
use App\Models\BrandPermission;
use App\Models\CollectionPermission;
use App\Models\Brand;
use App\Models\Collection;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'client_id',
        'business_name',
        'theme_color',
        'theme_mode'
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }


    public function client()
    {
        return $this->belongsTo(User::class);
    }
    public function staff()
    {
        return $this->hasOne(User::class,'client_id');
    }
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected static function booted()
    {
        static::created(function ($user) {
            event(new \App\Events\AddUserCollectionPermission($user));
            event(new \App\Events\AddUserAddonPermission($user));
            event(new \App\Events\AddUserLenseMaterialPermission($user));
        });
    }
}


