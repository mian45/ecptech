<?php

namespace App\Providers;

use App\Providers\UserCollectionPermission;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

use App\Models\LenseType;
use App\Models\BrandPermission;
use App\Models\CollectionPermission;
use App\Models\Brand;
use App\Models\Collection;



class AddUserCollectionPermission
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Providers\UserCollectionPermission  $event
     * @return void
     */
    public function handle(UserCollectionPermission $event)
    {
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
    }
}
