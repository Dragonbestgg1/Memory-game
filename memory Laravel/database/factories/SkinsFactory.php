<?php

namespace Database\Factories;

use App\Models\Skins;
use Illuminate\Database\Eloquent\Factories\Factory;

class SkinsFactory extends Factory
{
    protected $model = Skins::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'images' => json_encode($this->faker->words(3)), // generates an array of 3 random words
        ];
    }
}
