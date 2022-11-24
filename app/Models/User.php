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
            $lense_types = LenseType::get();

            foreach($lense_types as $lense){
                $brands = Brand::where('lens_type_id',$lense->id)->get();
                foreach($brands as $b){
                    if($b->title == 'Shamir' OR (($lense->title == 'Bifocal' OR $lense->title == 'Trifocal') AND  $b->title == '-')){

                        $brandPermission = BrandPermission::updateOrCreate(
                            ['user_id' => $user->id, 'lense_type_id' => $lense->id,'brand_id'=>$b->id],
                            ['status' => 'active']
                        );

                        $collections = Collection::where('brand_id',$b->id)->get();
                                    
                        foreach($collections as $c){
                                
                            
                            if(
                                (
                                    $lense->title =='Single Vision' AND 
                                    (
                                        strpos($c->title, 'Relax') !== false 
                                        OR strpos($c->title, 'Autograph III') !== false
                                    )                          
                                ) 
                                OR 
                                (
                                    $lense->title =='PAL' AND 
                                    (
                                        strpos($c->title, 'Autograph Intelligence') !== false 
                                        OR strpos($c->title, 'Autograph II+') !== false 
                                        OR strpos($c->title, 'Spectrum') !== false
                                    )                       
                                )
                                OR 
                                (
                                    $lense->title =='NVF' AND 
                                    (
                                        strpos($c->title, 'Computer/Workspace') !== false
                                    )                   
                                )
                                OR 
                                (
                                    $lense->title =='Bifocal' AND 
                                    (
                                        strpos($c->title, 'Aspherical/Spherical') !== false
                                        OR strpos($c->title, 'Digital Aspheric') !== false
                                    )
                                                    
                                )
                                OR 
                                (
                                    $lense->title =='Trifocal' AND 
                                    (
                                        strpos($c->title, 'Aspherical/Spherical') !== false
                                    )
                                                    
                                )
                            ) 
                            {
                                
                                $collectionPermission = CollectionPermission::updateOrCreate(
                                    ['user_id' => $user->id, 'brand_id' => $b->id, 'collection_id' => $c->id],
                                    ['status' => 'active'],
                                );
                            }
                        }

                    }
                }
            }
        });
    }
}
