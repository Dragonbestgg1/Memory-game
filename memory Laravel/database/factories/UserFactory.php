<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition()
    {
        return [
            'username' => $this->faker->userName,
            'password' => Hash::make('password'), // default password is 'password'
            'email' => $this->faker->unique()->safeEmail,
            'profile_img' => $this->faker->imageUrl(), // generates a random image url
            'completed_achievements' => json_encode($this->faker->words(3)), // generates an array of 3 random words
            'unlocked_styles' => json_encode($this->faker->words(3)),
            'cleared_levels' => json_encode($this->faker->randomDigit), // generates a random digit
            'personal_best_times' => json_encode($this->faker->randomDigit),
            'unlocked_skins' => json_encode($this->faker->words(3)),
            'points' => $this->faker->randomNumber(),
            'unlocked_secret' => $this->faker->boolean,
            'unlocked_secret_style' => $this->faker->boolean,
        ];
    }
}
