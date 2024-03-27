<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $fillable = [
        'username',
        'password',
        'email',
        'profile_img',
        'completed_achievements',
        'unlocked_styles',
        'cleared_levels',
        'personal_best_times',
        'unlocked_skins',
        'points',
        'unlocked_secret',
        'unlocked_secret_style',
    ];

    protected $casts = [
        'completed_achievements' => 'array',
        'unlocked_styles' => 'array',
        'cleared_levels' => 'array',
        'personal_best_times' => 'array',
        'unlocked_skins' => 'array',
    ];
}
