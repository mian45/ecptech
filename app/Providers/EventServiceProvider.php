<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

use App\Models\LenseType;
use App\Models\UserLenseMaterialSetting;
use App\Models\BrandPermission;
use App\Models\CollectionPermission;
use App\Models\Brand;
use App\Models\Collection;

class EventServiceProvider extends ServiceProvider
{


    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        \Event::listen('App\Events\AddUserCollectionPermission', function($event) {

            $user = $event->user;
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

    /**
     * Determine if events and listeners should be automatically discovered.
     *
     * @return bool
     */
    public function shouldDiscoverEvents()
    {
        return false;
    }
}
