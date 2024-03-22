<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username');
            $table->string('password');
            $table->string('email')->unique();
            $table->string('profile_img')->nullable();
            $table->json('completed_achievements')->nullable();
            $table->json('unlocked_styles')->nullable();
            $table->json('cleared_levels')->nullable();
            $table->json('personal_best_times')->nullable();
            $table->json('unlocked_skins')->nullable();
            $table->integer('points')->default(0);
            $table->integer('unlocked_secret')->default(0);
            $table->integer('unlocked_secret_style')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
