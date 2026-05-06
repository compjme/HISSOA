package com.example.myapplication

import io.github.jan.supabase.createSupabaseClient
import io.github.jan.supabase.auth.Auth
import io.github.jan.supabase.postgrest.Postgrest

object SupabaseClient {
    const val URL = "https://sglivjrbztygenhawylp.supabase.co"
    const val KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnbGl2anJienR5Z2VuaGF3eWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxODA2MTgsImV4cCI6MjA4ODc1NjYxOH0.E5zPWczl8wqdBjhFCtSBfjFWyd04O-jSuTQzOq8YwvU"

    val client = createSupabaseClient(URL, KEY) {
        install(Auth) {
            autoLoadFromStorage = false
            alwaysAutoRefresh = true
        }
        install(Postgrest)
    }
}
