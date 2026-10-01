export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      customer_profiles: {
        Row: {
          id: string
          device_id: string
          name: string
          phone: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          device_id: string
          name: string
          phone?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          device_id?: string
          name?: string
          phone?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      dim_date: {
        Row: {
          date_key: number
          full_date: string
          day_of_week: number
          day_name: string
          day_of_month: number
          day_of_year: number
          week_of_year: number
          month_number: number
          month_name: string
          quarter_number: number
          quarter_name: string
          year_number: number
          is_weekend: boolean
          is_holiday: boolean
          fiscal_quarter: string | null
          fiscal_year: number | null
        }
        Insert: {
          date_key: number
          full_date: string
          day_of_week: number
          day_name: string
          day_of_month: number
          day_of_year: number
          week_of_year: number
          month_number: number
          month_name: string
          quarter_number: number
          quarter_name: string
          year_number: number
          is_weekend?: boolean
          is_holiday?: boolean
          fiscal_quarter?: string | null
          fiscal_year?: number | null
        }
        Update: {
          date_key?: number
          full_date?: string
          day_of_week?: number
          day_name?: string
          day_of_month?: number
          day_of_year?: number
          week_of_year?: number
          month_number?: number
          month_name?: string
          quarter_number?: number
          quarter_name?: string
          year_number?: number
          is_weekend?: boolean
          is_holiday?: boolean
          fiscal_quarter?: string | null
          fiscal_year?: number | null
        }
        Relationships: []
      }
      dim_time: {
        Row: {
          time_key: number
          full_time: string
          hour_24: number
          hour_12: number
          minute: number
          am_pm: string
          meal_period: string
          time_bucket_15min: string
          time_bucket_hour: string
        }
        Insert: {
          time_key: number
          full_time: string
          hour_24: number
          hour_12: number
          minute: number
          am_pm: string
          meal_period: string
          time_bucket_15min: string
          time_bucket_hour: string
        }
        Update: {
          time_key?: number
          full_time?: string
          hour_24?: number
          hour_12?: number
          minute?: number
          am_pm?: string
          meal_period?: string
          time_bucket_15min?: string
          time_bucket_hour?: string
        }
        Relationships: []
      }
      dim_restaurants: {
        Row: {
          restaurant_dim_id: string
          restaurant_id: string
          restaurant_name: string
          slug: string
          description: string | null
          address: string | null
          phone: string | null
          email: string | null
          currency: string | null
          tax_rate: number | null
          service_charge_rate: number | null
          subscription_tier: string | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          restaurant_dim_id?: string
          restaurant_id: string
          restaurant_name: string
          slug: string
          description?: string | null
          address?: string | null
          phone?: string | null
          email?: string | null
          currency?: string | null
          tax_rate?: number | null
          service_charge_rate?: number | null
          subscription_tier?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          restaurant_dim_id?: string
          restaurant_id?: string
          restaurant_name?: string
          slug?: string
          description?: string | null
          address?: string | null
          phone?: string | null
          email?: string | null
          currency?: string | null
          tax_rate?: number | null
          service_charge_rate?: number | null
          subscription_tier?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      dim_categories: {
        Row: {
          category_dim_id: string
          category_id: string
          restaurant_dim_id: string | null
          restaurant_id: string
          category_name: string
          display_order: number | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          category_dim_id?: string
          category_id: string
          restaurant_dim_id?: string | null
          restaurant_id: string
          category_name: string
          display_order?: number | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          category_dim_id?: string
          category_id?: string
          restaurant_dim_id?: string | null
          restaurant_id?: string
          category_name?: string
          display_order?: number | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dim_categories_restaurant_dim_id_fkey"
            columns: ["restaurant_dim_id"]
            isOneToOne: false
            referencedRelation: "dim_restaurants"
            referencedColumns: ["restaurant_dim_id"]
          }
        ]
      }
      dim_menu_items: {
        Row: {
          menu_item_dim_id: string
          menu_item_id: string
          restaurant_dim_id: string | null
          restaurant_id: string
          category_dim_id: string | null
          category_id: string | null
          category_name: string | null
          item_name: string
          description: string | null
          price: number
          food_type: string | null
          is_available: boolean | null
          image_url: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          menu_item_dim_id?: string
          menu_item_id: string
          restaurant_dim_id?: string | null
          restaurant_id: string
          category_dim_id?: string | null
          category_id?: string | null
          category_name?: string | null
          item_name: string
          description?: string | null
          price?: number
          food_type?: string | null
          is_available?: boolean | null
          image_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          menu_item_dim_id?: string
          menu_item_id?: string
          restaurant_dim_id?: string | null
          restaurant_id?: string
          category_dim_id?: string | null
          category_id?: string | null
          category_name?: string | null
          item_name?: string
          description?: string | null
          price?: number
          food_type?: string | null
          is_available?: boolean | null
          image_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dim_menu_items_restaurant_dim_id_fkey"
            columns: ["restaurant_dim_id"]
            isOneToOne: false
            referencedRelation: "dim_restaurants"
            referencedColumns: ["restaurant_dim_id"]
          },
          {
            foreignKeyName: "dim_menu_items_category_dim_id_fkey"
            columns: ["category_dim_id"]
            isOneToOne: false
            referencedRelation: "dim_categories"
            referencedColumns: ["category_dim_id"]
          }
        ]
      }
      dim_tables: {
        Row: {
          table_dim_id: string
          table_id: string
          restaurant_dim_id: string | null
          restaurant_id: string
          table_number: string
          capacity: number | null
          status: string | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          table_dim_id?: string
          table_id: string
          restaurant_dim_id?: string | null
          restaurant_id: string
          table_number: string
          capacity?: number | null
          status?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          table_dim_id?: string
          table_id?: string
          restaurant_dim_id?: string | null
          restaurant_id?: string
          table_number?: string
          capacity?: number | null
          status?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dim_tables_restaurant_dim_id_fkey"
            columns: ["restaurant_dim_id"]
            isOneToOne: false
            referencedRelation: "dim_restaurants"
            referencedColumns: ["restaurant_dim_id"]
          }
        ]
      }
      dim_customers: {
        Row: {
          customer_dim_id: string
          restaurant_dim_id: string | null
          restaurant_id: string
          customer_phone: string
          customer_name: string | null
          total_orders_count: number | null
          total_spent_amount: number | null
          first_order_date_key: number | null
          last_order_date_key: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          customer_dim_id?: string
          restaurant_dim_id?: string | null
          restaurant_id: string
          customer_phone: string
          customer_name?: string | null
          total_orders_count?: number | null
          total_spent_amount?: number | null
          first_order_date_key?: number | null
          last_order_date_key?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          customer_dim_id?: string
          restaurant_dim_id?: string | null
          restaurant_id?: string
          customer_phone?: string
          customer_name?: string | null
          total_orders_count?: number | null
          total_spent_amount?: number | null
          first_order_date_key?: number | null
          last_order_date_key?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dim_customers_restaurant_dim_id_fkey"
            columns: ["restaurant_dim_id"]
            isOneToOne: false
            referencedRelation: "dim_restaurants"
            referencedColumns: ["restaurant_dim_id"]
          },
          {
            foreignKeyName: "dim_customers_first_order_date_key_fkey"
            columns: ["first_order_date_key"]
            isOneToOne: false
            referencedRelation: "dim_date"
            referencedColumns: ["date_key"]
          },
          {
            foreignKeyName: "dim_customers_last_order_date_key_fkey"
            columns: ["last_order_date_key"]
            isOneToOne: false
            referencedRelation: "dim_date"
            referencedColumns: ["date_key"]
          }
        ]
      }
      fact_orders: {
        Row: {
          order_fact_id: string
          order_id: string
          order_number: number | null
          date_key: number
          time_key: number
          restaurant_dim_id: string
          restaurant_id: string
          table_dim_id: string | null
          table_id: string | null
          customer_dim_id: string | null
          customer_name: string | null
          customer_phone: string | null
          order_status: string | null
          payment_status: string | null
          payment_method: string | null
          item_count: number
          subtotal: number
          tax_amount: number
          service_charge: number
          discount_amount: number
          total_amount: number
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          order_fact_id?: string
          order_id: string
          order_number?: number | null
          date_key: number
          time_key: number
          restaurant_dim_id: string
          restaurant_id: string
          table_dim_id?: string | null
          table_id?: string | null
          customer_dim_id?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          order_status?: string | null
          payment_status?: string | null
          payment_method?: string | null
          item_count?: number
          subtotal?: number
          tax_amount?: number
          service_charge?: number
          discount_amount?: number
          total_amount?: number
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          order_fact_id?: string
          order_id?: string
          order_number?: number | null
          date_key?: number
          time_key?: number
          restaurant_dim_id?: string
          restaurant_id?: string
          table_dim_id?: string | null
          table_id?: string | null
          customer_dim_id?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          order_status?: string | null
          payment_status?: string | null
          payment_method?: string | null
          item_count?: number
          subtotal?: number
          tax_amount?: number
          service_charge?: number
          discount_amount?: number
          total_amount?: number
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fact_orders_date_key_fkey"
            columns: ["date_key"]
            isOneToOne: false
            referencedRelation: "dim_date"
            referencedColumns: ["date_key"]
          },
          {
            foreignKeyName: "fact_orders_time_key_fkey"
            columns: ["time_key"]
            isOneToOne: false
            referencedRelation: "dim_time"
            referencedColumns: ["time_key"]
          },
          {
            foreignKeyName: "fact_orders_restaurant_dim_id_fkey"
            columns: ["restaurant_dim_id"]
            isOneToOne: false
            referencedRelation: "dim_restaurants"
            referencedColumns: ["restaurant_dim_id"]
          },
          {
            foreignKeyName: "fact_orders_table_dim_id_fkey"
            columns: ["table_dim_id"]
            isOneToOne: false
            referencedRelation: "dim_tables"
            referencedColumns: ["table_dim_id"]
          },
          {
            foreignKeyName: "fact_orders_customer_dim_id_fkey"
            columns: ["customer_dim_id"]
            isOneToOne: false
            referencedRelation: "dim_customers"
            referencedColumns: ["customer_dim_id"]
          }
        ]
      }
      fact_order_items: {
        Row: {
          order_item_fact_id: string
          order_item_id: string
          order_id: string
          order_fact_id: string | null
          date_key: number
          time_key: number
          restaurant_dim_id: string
          restaurant_id: string
          menu_item_dim_id: string | null
          menu_item_id: string | null
          category_dim_id: string | null
          table_dim_id: string | null
          customer_dim_id: string | null
          item_name: string
          order_status: string | null
          quantity: number
          unit_price: number
          gross_amount: number
          discount_amount: number
          net_amount: number
          created_at: string | null
        }
        Insert: {
          order_item_fact_id?: string
          order_item_id: string
          order_id: string
          order_fact_id?: string | null
          date_key: number
          time_key: number
          restaurant_dim_id: string
          restaurant_id: string
          menu_item_dim_id?: string | null
          menu_item_id?: string | null
          category_dim_id?: string | null
          table_dim_id?: string | null
          customer_dim_id?: string | null
          item_name: string
          order_status?: string | null
          quantity?: number
          unit_price?: number
          gross_amount?: number
          discount_amount?: number
          net_amount?: number
          created_at?: string | null
        }
        Update: {
          order_item_fact_id?: string
          order_item_id?: string
          order_id?: string
          order_fact_id?: string | null
          date_key?: number
          time_key?: number
          restaurant_dim_id?: string
          restaurant_id?: string
          menu_item_dim_id?: string | null
          menu_item_id?: string | null
          category_dim_id?: string | null
          table_dim_id?: string | null
          customer_dim_id?: string | null
          item_name?: string
          order_status?: string | null
          quantity?: number
          unit_price?: number
          gross_amount?: number
          discount_amount?: number
          net_amount?: number
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fact_order_items_date_key_fkey"
            columns: ["date_key"]
            isOneToOne: false
            referencedRelation: "dim_date"
            referencedColumns: ["date_key"]
          },
          {
            foreignKeyName: "fact_order_items_time_key_fkey"
            columns: ["time_key"]
            isOneToOne: false
            referencedRelation: "dim_time"
            referencedColumns: ["time_key"]
          },
          {
            foreignKeyName: "fact_order_items_restaurant_dim_id_fkey"
            columns: ["restaurant_dim_id"]
            isOneToOne: false
            referencedRelation: "dim_restaurants"
            referencedColumns: ["restaurant_dim_id"]
          },
          {
            foreignKeyName: "fact_order_items_menu_item_dim_id_fkey"
            columns: ["menu_item_dim_id"]
            isOneToOne: false
            referencedRelation: "dim_menu_items"
            referencedColumns: ["menu_item_dim_id"]
          },
          {
            foreignKeyName: "fact_order_items_category_dim_id_fkey"
            columns: ["category_dim_id"]
            isOneToOne: false
            referencedRelation: "dim_categories"
            referencedColumns: ["category_dim_id"]
          },
          {
            foreignKeyName: "fact_order_items_table_dim_id_fkey"
            columns: ["table_dim_id"]
            isOneToOne: false
            referencedRelation: "dim_tables"
            referencedColumns: ["table_dim_id"]
          },
          {
            foreignKeyName: "fact_order_items_customer_dim_id_fkey"
            columns: ["customer_dim_id"]
            isOneToOne: false
            referencedRelation: "dim_customers"
            referencedColumns: ["customer_dim_id"]
          }
        ]
      }
      fact_daily_restaurant_summary: {
        Row: {
          summary_fact_id: string
          date_key: number
          restaurant_dim_id: string
          restaurant_id: string
          total_orders: number | null
          completed_orders: number | null
          cancelled_orders: number | null
          total_items_sold: number | null
          gross_sales: number | null
          tax_collected: number | null
          discounts_given: number | null
          net_sales: number | null
          average_order_value: number | null
          updated_at: string | null
        }
        Insert: {
          summary_fact_id?: string
          date_key: number
          restaurant_dim_id: string
          restaurant_id: string
          total_orders?: number | null
          completed_orders?: number | null
          cancelled_orders?: number | null
          total_items_sold?: number | null
          gross_sales?: number | null
          tax_collected?: number | null
          discounts_given?: number | null
          net_sales?: number | null
          average_order_value?: number | null
          updated_at?: string | null
        }
        Update: {
          summary_fact_id?: string
          date_key?: number
          restaurant_dim_id?: string
          restaurant_id?: string
          total_orders?: number | null
          completed_orders?: number | null
          cancelled_orders?: number | null
          total_items_sold?: number | null
          gross_sales?: number | null
          tax_collected?: number | null
          discounts_given?: number | null
          net_sales?: number | null
          average_order_value?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fact_daily_restaurant_summary_date_key_fkey"
            columns: ["date_key"]
            isOneToOne: false
            referencedRelation: "dim_date"
            referencedColumns: ["date_key"]
          },
          {
            foreignKeyName: "fact_daily_restaurant_summary_restaurant_dim_id_fkey"
            columns: ["restaurant_dim_id"]
            isOneToOne: false
            referencedRelation: "dim_restaurants"
            referencedColumns: ["restaurant_dim_id"]
          }
        ]
      }
      seat_occupancy: {
        Row: {
          id: string
          restaurant_id: string
          table_id: string
          table_session_id: string
          seat_number: number
          status: string | null
          order_id: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          restaurant_id: string
          table_id: string
          table_session_id: string
          seat_number: number
          status?: string | null
          order_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          restaurant_id?: string
          table_id?: string
          table_session_id?: string
          seat_number?: number
          status?: string | null
          order_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "seat_occupancy_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seat_occupancy_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "tables"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seat_occupancy_table_session_id_fkey"
            columns: ["table_session_id"]
            isOneToOne: false
            referencedRelation: "table_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seat_occupancy_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          }
        ]
      }
      ai_enrichments: {
        Row: {
          id: string
          menu_item_id: string
          short_description: string | null
          medium_description: string | null
          seo_description: string | null
          calories: number | null
          protein: number | null
          carbs: number | null
          fat: number | null
          allergens: string[] | null
          tags: string[] | null
          upsell_recommendations: Json | null
          image_search_queries: string[] | null
          created_at: string
        }
        Insert: {
          id?: string
          menu_item_id: string
          short_description?: string | null
          medium_description?: string | null
          seo_description?: string | null
          calories?: number | null
          protein?: number | null
          carbs?: number | null
          fat?: number | null
          allergens?: string[] | null
          tags?: string[] | null
          upsell_recommendations?: Json | null
          image_search_queries?: string[] | null
          created_at?: string
        }
        Update: {
          id?: string
          menu_item_id?: string
          short_description?: string | null
          medium_description?: string | null
          seo_description?: string | null
          calories?: number | null
          protein?: number | null
          carbs?: number | null
          fat?: number | null
          allergens?: string[] | null
          tags?: string[] | null
          upsell_recommendations?: Json | null
          image_search_queries?: string[] | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_enrichments_menu_item_id_fkey"
            columns: ["menu_item_id"]
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          }
        ]
      }
      image_discoveries: {
        Row: {
          id: string
          menu_item_id: string
          query_used: string
          candidate_url: string
          source_platform: string
          visual_confidence_score: number
          aesthetic_quality_score: number
          rejection_reason: string | null
          is_selected: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          menu_item_id: string
          query_used: string
          candidate_url: string
          source_platform: string
          visual_confidence_score: number
          aesthetic_quality_score: number
          rejection_reason?: string | null
          is_selected?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          menu_item_id?: string
          query_used?: string
          candidate_url?: string
          source_platform?: string
          visual_confidence_score?: number
          aesthetic_quality_score?: number
          rejection_reason?: string | null
          is_selected?: boolean | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "image_discoveries_menu_item_id_fkey"
            columns: ["menu_item_id"]
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          }
        ]
      }
      ocr_imports: {
        Row: {
          id: string
          restaurant_id: string
          file_path: string | null
          status: string
          raw_ocr_text: string | null
          extracted_menu: Json | null
          confidence_score: number | null
          processing_time_ms: number | null
          error_message: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          file_path?: string | null
          status?: string
          raw_ocr_text?: string | null
          extracted_menu?: Json | null
          confidence_score?: number | null
          processing_time_ms?: number | null
          error_message?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          file_path?: string | null
          status?: string
          raw_ocr_text?: string | null
          extracted_menu?: Json | null
          confidence_score?: number | null
          processing_time_ms?: number | null
          error_message?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ocr_imports_restaurant_id_fkey"
            columns: ["restaurant_id"]
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          }
        ]
      }
      ocr_analytics_metrics: {
        Row: {
          id: string
          restaurant_id: string
          action_type: string
          is_success: boolean
          processing_time_ms: number
          manual_corrections_count: number | null
          created_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          action_type: string
          is_success: boolean
          processing_time_ms: number
          manual_corrections_count?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          action_type?: string
          is_success?: boolean
          processing_time_ms?: number
          manual_corrections_count?: number | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ocr_analytics_metrics_restaurant_id_fkey"
            columns: ["restaurant_id"]
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          }
        ]
      }
      addon_groups: {
        Row: {
          created_at: string
          display_order: number
          id: string
          max_select: number
          min_select: number
          name: string
          restaurant_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          max_select?: number
          min_select?: number
          name: string
          restaurant_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          max_select?: number
          min_select?: number
          name?: string
          restaurant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "addon_groups_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "addon_groups_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants_public"
            referencedColumns: ["id"]
          },
        ]
      }
      addon_options: {
        Row: {
          addon_group_id: string
          created_at: string
          display_order: number
          id: string
          is_available: boolean
          name: string
          price: number
        }
        Insert: {
          addon_group_id: string
          created_at?: string
          display_order?: number
          id?: string
          is_available?: boolean
          name: string
          price?: number
        }
        Update: {
          addon_group_id?: string
          created_at?: string
          display_order?: number
          id?: string
          is_available?: boolean
          name?: string
          price?: number
        }
        Relationships: [
          {
            foreignKeyName: "addon_options_addon_group_id_fkey"
            columns: ["addon_group_id"]
            isOneToOne: false
            referencedRelation: "addon_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      ads: {
        Row: {
          advertiser_name: string | null
          budget: number | null
          campaign_type: string | null
          clicks: number | null
          created_at: string | null
          cta_text: string | null
          description: string | null
          ends_at: string | null
          id: string
          image_url: string | null
          impressions: number | null
          is_active: boolean | null
          link_url: string | null
          placement_type: string | null
          priority: number | null
          revenue_model: string | null
          starts_at: string | null
          target_categories: string[] | null
          target_locations: string[] | null
          target_restaurants: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          advertiser_name?: string | null
          budget?: number | null
          campaign_type?: string | null
          clicks?: number | null
          created_at?: string | null
          cta_text?: string | null
          description?: string | null
          ends_at?: string | null
          id?: string
          image_url?: string | null
          impressions?: number | null
          is_active?: boolean | null
          link_url?: string | null
          placement_type?: string | null
          priority?: number | null
          revenue_model?: string | null
          starts_at?: string | null
          target_categories?: string[] | null
          target_locations?: string[] | null
          target_restaurants?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          advertiser_name?: string | null
          budget?: number | null
          campaign_type?: string | null
          clicks?: number | null
          created_at?: string | null
          cta_text?: string | null
          description?: string | null
          ends_at?: string | null
          id?: string
          image_url?: string | null
          impressions?: number | null
          is_active?: boolean | null
          link_url?: string | null
          placement_type?: string | null
          priority?: number | null
          revenue_model?: string | null
          starts_at?: string | null
          target_categories?: string[] | null
          target_locations?: string[] | null
          target_restaurants?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      analytics_daily: {
        Row: {
          avg_order_value: number | null
          avg_prep_time_minutes: number | null
          avg_wait_time_minutes: number | null
          created_at: string | null
          date: string
          id: string
          order_count: number | null
          restaurant_id: string
          total_revenue: number | null
          updated_at: string | null
        }
        Insert: {
          avg_order_value?: number | null
          avg_prep_time_minutes?: number | null
          avg_wait_time_minutes?: number | null
          created_at?: string | null
          date: string
          id?: string
          order_count?: number | null
          restaurant_id: string
          total_revenue?: number | null
          updated_at?: string | null
        }
        Update: {
          avg_order_value?: number | null
          avg_prep_time_minutes?: number | null
          avg_wait_time_minutes?: number | null
          created_at?: string | null
          date?: string
          id?: string
          order_count?: number | null
          restaurant_id?: string
          total_revenue?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_daily_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_daily_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants_public"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_events: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          restaurant_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          restaurant_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          restaurant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_events_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants_public"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          restaurant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          restaurant_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          restaurant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categories_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants_public"
            referencedColumns: ["id"]
          },
        ]
      }
      coupons: {
        Row: {
          code: string
          created_at: string | null
          discount_type: string
          discount_value: number
          expires_at: string | null
          id: string
          is_active: boolean | null
          max_discount_amount: number | null
          min_order_amount: number | null
          restaurant_id: string
          starts_at: string | null
          updated_at: string | null
          usage_count: number | null
          usage_limit: number | null
        }
        Insert: {
          code: string
          created_at?: string | null
          discount_type: string
          discount_value: number
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_discount_amount?: number | null
          min_order_amount?: number | null
          restaurant_id: string
          starts_at?: string | null
          updated_at?: string | null
          usage_count?: number | null
          usage_limit?: number | null
        }
        Update: {
          code?: string
          created_at?: string | null
          discount_type?: string
          discount_value?: number
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_discount_amount?: number | null
          min_order_amount?: number | null
          restaurant_id?: string
          starts_at?: string | null
          updated_at?: string | null
          usage_count?: number | null
          usage_limit?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "coupons_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coupons_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants_public"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_events: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          restaurant_id: string | null
          session_id: string | null
          table_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          restaurant_id?: string | null
          session_id?: string | null
          table_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          restaurant_id?: string | null
          session_id?: string | null
          table_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_events_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_events_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_events_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "tables"
            referencedColumns: ["id"]
          },
        ]
      }
      default_tax_settings: {
        Row: {
          currency: string
          gst_percent: number
          id: string
          service_charge_percent: number
          tax_mode: string
          updated_at: string
          vat_percent: number
        }
        Insert: {
          currency?: string
          gst_percent?: number
          id?: string
          service_charge_percent?: number
          tax_mode?: string
          updated_at?: string
          vat_percent?: number
        }
        Update: {
          currency?: string
          gst_percent?: number
          id?: string
          service_charge_percent?: number
          tax_mode?: string
          updated_at?: string
          vat_percent?: number
        }
        Relationships: []
      }
      email_templates: {
        Row: {
          body_html: string
          created_at: string
          id: string
          subject: string
          template_name: string
          updated_at: string
          variables_json: Json | null
        }
        Insert: {
          body_html?: string
          created_at?: string
          id?: string
          subject?: string
          template_name: string
          updated_at?: string
          variables_json?: Json | null
        }
        Update: {
          body_html?: string
          created_at?: string
          id?: string
          subject?: string
          template_name?: string
          updated_at?: string
          variables_json?: Json | null
        }
        Relationships: []
      }
      feedback: {
        Row: {
          comment: string | null
          created_at: string | null
          customer_email: string | null
          customer_name: string | null
          id: string
          order_id: string | null
          rating: number
          redirected_to_google: boolean | null
          restaurant_id: string
          table_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string | null
          id?: string
          order_id?: string | null
          rating: number
          redirected_to_google?: boolean | null
          restaurant_id: string
          table_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string | null
          id?: string
          order_id?: string | null
          rating?: number
          redirected_to_google?: boolean | null
          restaurant_id?: string
          table_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "tables"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_items: {
        Row: {
          created_at: string
          current_stock: number
          id: string
          low_stock_threshold: number
          name: string
          restaurant_id: string
          unit: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_stock?: number
          id?: string
          low_stock_threshold?: number
          name: string
          restaurant_id: string
          unit?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_stock?: number
          id?: string
          low_stock_threshold?: number
          name?: string
          restaurant_id?: string
          unit?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_items_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_items_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants_public"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_sync_log: {
        Row: {
          created_at: string | null
          error_message: string | null
          id: string
          invoice_id: string
          payload: Json
          response: Json | null
          restaurant_id: string
          status: string
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          invoice_id: string
          payload?: Json
          response?: Json | null
          restaurant_id: string
          status?: string
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          invoice_id?: string
          payload?: Json
          response?: Json | null
          restaurant_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoice_sync_log_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_sync_log_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_sync_log_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants_public"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          created_at: string | null
          customer_name: string | null
          customer_phone: string | null
          discount_amount: number | null
          id: string
          invoice_number: string
          items: Json
          notes: string | null
          order_id: string
          payment_method: string
          payment_status: string
          printed: boolean | null
          restaurant_id: string
          service_charge: number
          subtotal: number
          tax_amount: number
          total_amount: number
        }
        Insert: {
          created_at?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          discount_amount?: number | null
          id?: string
          invoice_number: string
          items: Json
          notes?: string | null
          order_id: string
          payment_method: string
          payment_status?: string
          printed?: boolean | null
          restaurant_id: string
          service_charge?: number
          subtotal?: number
          tax_amount?: number
          total_amount?: number
        }
        Update: {
          created_at?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          discount_amount?: number | null
          id?: string
          invoice_number?: string
          items?: Json
          notes?: string | null
          order_id?: string
          payment_method?: string
          payment_status?: string
          printed?: boolean | null
          restaurant_id?: string
          service_charge?: number
          subtotal?: number
          tax_amount?: number
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoices_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants_public"
            referencedColumns: ["id"]
          },
        ]
      }
      landing_page_sections: {
        Row: {
          content_json: Json
          created_at: string
          display_order: number
          id: string
          is_visible: boolean
          section_key: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          content_json?: Json
          created_at?: string
          display_order?: number
          id?: string
          is_visible?: boolean
          section_key: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          content_json?: Json
          created_at?: string
          display_order?: number
          id?: string
          is_visible?: boolean
          section_key?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      menu_items: {
        Row: {
          addon_group_ids: string[] | null
          category_id: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          image_url: string | null
          is_available: boolean | null
          is_popular: boolean | null
          is_vegan: boolean | null
          is_vegetarian: boolean | null
          name: string
          prep_time_minutes: number | null
          price: number
          restaurant_id: string
          spicy_level: number | null
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          addon_group_ids?: string[] | null
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          is_popular?: boolean | null
          is_vegan?: boolean | null
          is_vegetarian?: boolean | null
          name: string
          prep_time_minutes?: number | null
          price: number
          restaurant_id: string
          spicy_level?: number | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          addon_group_ids?: string[] | null
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          is_popular?: boolean | null
          is_vegan?: boolean | null
          is_vegetarian?: boolean | null
          name?: string
          prep_time_minutes?: number | null
          price?: number
          restaurant_id?: string
          spicy_level?: number | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menu_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menu_items_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menu_items_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants_public"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          is_active: boolean
          subscribed_at: string
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
        }
        Relationships: []
      }
      offers: {
        Row: {
          created_at: string
          description: string | null
          discount_text: string | null
          end_date: string
          id: string
          image_url: string | null
          is_active: boolean
          linked_menu_item_id: string | null
          restaurant_id: string
          sort_order: number
          start_date: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          discount_text?: string | null
          end_date?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          linked_menu_item_id?: string | null
          restaurant_id: string
          sort_order?: number
          start_date?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          discount_text?: string | null
          end_date?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          linked_menu_item_id?: string | null
          restaurant_id?: string
          sort_order?: number
          start_date?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "offers_linked_menu_item_id_fkey"
            columns: ["linked_menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offers_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offers_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants_public"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string | null
          id: string
          menu_item_id: string | null
          name: string
          order_id: string
          price: number
          quantity: number
          selected_addons: Json | null
          selected_variants: Json | null
          special_instructions: string | null
          status: Database["public"]["Enums"]["order_status"] | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          menu_item_id?: string | null
          name: string
          order_id: string
          price: number
          quantity?: number
          selected_addons?: Json | null
          selected_variants?: Json | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
        }
        Update: {
          created_at?: string | null
          id?: string
          menu_item_id?: string | null
          name?: string
          order_id?: string
          price?: number
          quantity?: number
          selected_addons?: Json | null
          selected_variants?: Json | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders_public"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          cancel_reason: string | null
          cancelled_at: string | null
          created_at: string | null
          customer_name: string | null
          customer_phone: string | null
          estimated_ready_at: string | null
          id: string
          order_number: number
          payment_method: string | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          ready_at: string | null
          restaurant_id: string
          seat_number: number | null
          service_charge: number | null
          special_instructions: string | null
          started_preparing_at: string | null
          status: Database["public"]["Enums"]["order_status"] | null
          subtotal: number | null
          table_id: string | null
          table_session_id: string | null
          seat_session_id: string | null
          tax_amount: number | null
          total_amount: number | null
          updated_at: string | null
        }
        Insert: {
          cancel_reason?: string | null
          cancelled_at?: string | null
          created_at?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          estimated_ready_at?: string | null
          id?: string
          order_number?: number
          payment_method?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          ready_at?: string | null
          restaurant_id: string
          seat_number?: number | null
          service_charge?: number | null
          special_instructions?: string | null
          started_preparing_at?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          subtotal?: number | null
          table_id?: string | null
          table_session_id?: string | null
          tax_amount?: number | null
          total_amount?: number | null
          updated_at?: string | null
        }
        Update: {
          cancel_reason?: string | null
          cancelled_at?: string | null
          created_at?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          estimated_ready_at?: string | null
          id?: string
          order_number?: number
          payment_method?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          ready_at?: string | null
          restaurant_id?: string
          seat_number?: number | null
          service_charge?: number | null
          special_instructions?: string | null
          started_preparing_at?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          subtotal?: number | null
          table_id?: string | null
          table_session_id?: string | null
          tax_amount?: number | null
          total_amount?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "tables"
            referencedColumns: ["id"]
          },
        ]
      }
      pages: {
        Row: {
          content_json: Json | null
          created_at: string
          id: string
          is_published: boolean
          page_slug: string
          page_type: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          content_json?: Json | null
          created_at?: string
          id?: string
          is_published?: boolean
          page_slug: string
          page_type?: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          content_json?: Json | null
          created_at?: string
          id?: string
          is_published?: boolean
          page_slug?: string
          page_type?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pages_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pages_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "restaurants_public"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_settings: {
        Row: {
          creator_email: string | null
          email_logo_url: string | null
          favicon_url: string | null
          id: string
          login_bg_url: string | null
          logo_url: string | null
          platform_name: string
          primary_color: string | null
          secondary_color: string | null
          updated_at: string
        }
        Insert: {
          creator_email?: string | null
          email_logo_url?: string | null
          favicon_url?: string | null
          id?: string
          login_bg_url?: string | null
          logo_url?: string | null
          platform_name?: string
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string
        }
        Update: {
          creator_email?: string | null
          email_logo_url?: string | null
          favicon_url?: string | null
          id?: string
          login_bg_url?: string | null
          logo_url?: string | null
          platform_name?: string
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      printer_queue: {
        Row: {
          attempts: number | null
          created_at: string | null
          error_message: string | null
          id: string
          order_id: string | null
          receipt_data: Json
          receipt_type: string
          restaurant_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          attempts?: number | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          order_id?: string | null
          receipt_data: Json
          receipt_type?: string
          restaurant_id: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          attempts?: number | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          order_id?: string | null
          receipt_data?: Json
          receipt_type?: string
          restaurant_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "printer_queue_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "printer_queue_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "printer_queue_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "printer_queue_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants_public"
            referencedColumns: ["id"]
          },
        ]
      }
      qr_codes: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean
          metadata: Json | null
          qr_name: string
          qr_type: string
          scan_count: number
          target_url: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          qr_name: string
          qr_type?: string
          scan_count?: number
          target_url: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          qr_name?: string
          qr_type?: string
          scan_count?: number
          target_url?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "qr_codes_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qr_codes_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "restaurants_public"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_requests: {
        Row: {
          city: string | null
          created_at: string
          current_system: string | null
          email: string
          features_needed: string[] | null
          id: string
          message: string | null
          name: string
          num_tables: number | null
          phone: string | null
          restaurant_name: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string
          current_system?: string | null
          email: string
          features_needed?: string[] | null
          id?: string
          message?: string | null
          name: string
          num_tables?: number | null
          phone?: string | null
          restaurant_name?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string
          current_system?: string | null
          email?: string
          features_needed?: string[] | null
          id?: string
          message?: string | null
          name?: string
          num_tables?: number | null
          phone?: string | null
          restaurant_name?: string | null
        }
        Relationships: []
      }
      recipe_mappings: {
        Row: {
          created_at: string
          id: string
          inventory_item_id: string
          menu_item_id: string
          quantity_used: number
        }
        Insert: {
          created_at?: string
          id?: string
          inventory_item_id: string
          menu_item_id: string
          quantity_used?: number
        }
        Update: {
          created_at?: string
          id?: string
          inventory_item_id?: string
          menu_item_id?: string
          quantity_used?: number
        }
        Relationships: [
          {
            foreignKeyName: "recipe_mappings_inventory_item_id_fkey"
            columns: ["inventory_item_id"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_mappings_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurants: {
        Row: {
          address: string | null
          ads_enabled: boolean | null
          banner_image_url: string | null
          cover_image_url: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          email: string | null
          favicon_url: string | null
          feature_toggles: Json | null
          font_family: string | null
          google_review_url: string | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          menu_title: string | null
          name: string
          onboarding_completed: boolean | null
          phone: string | null
          primary_color: string | null
          printer_settings: Json | null
          review_settings: Json | null
          secondary_color: string | null
          service_charge_rate: number | null
          settings: Json | null
          slug: string
          subscription_ends_at: string | null
          subscription_tier:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          tax_rate: number | null
          theme_config: Json | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          ads_enabled?: boolean | null
          banner_image_url?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          email?: string | null
          favicon_url?: string | null
          feature_toggles?: Json | null
          font_family?: string | null
          google_review_url?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          menu_title?: string | null
          name: string
          onboarding_completed?: boolean | null
          phone?: string | null
          primary_color?: string | null
          printer_settings?: Json | null
          review_settings?: Json | null
          secondary_color?: string | null
          service_charge_rate?: number | null
          settings?: Json | null
          slug: string
          subscription_ends_at?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          tax_rate?: number | null
          theme_config?: Json | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          ads_enabled?: boolean | null
          banner_image_url?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          email?: string | null
          favicon_url?: string | null
          feature_toggles?: Json | null
          font_family?: string | null
          google_review_url?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          menu_title?: string | null
          name?: string
          onboarding_completed?: boolean | null
          phone?: string | null
          primary_color?: string | null
          printer_settings?: Json | null
          review_settings?: Json | null
          secondary_color?: string | null
          service_charge_rate?: number | null
          settings?: Json | null
          slug?: string
          subscription_ends_at?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          tax_rate?: number | null
          theme_config?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      scan_analytics: {
        Row: {
          city: string | null
          country: string | null
          device: string | null
          id: string
          qr_id: string
          referrer: string | null
          scanned_at: string
          tenant_id: string
          user_agent: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          device?: string | null
          id?: string
          qr_id: string
          referrer?: string | null
          scanned_at?: string
          tenant_id: string
          user_agent?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          device?: string | null
          id?: string
          qr_id?: string
          referrer?: string | null
          scanned_at?: string
          tenant_id?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scan_analytics_qr_id_fkey"
            columns: ["qr_id"]
            isOneToOne: false
            referencedRelation: "qr_codes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scan_analytics_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scan_analytics_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "restaurants_public"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean
          name: string | null
          restaurant_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
          name?: string | null
          restaurant_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          name?: string | null
          restaurant_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_profiles_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_profiles_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants_public"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          created_at: string | null
          features: Json | null
          id: string
          is_active: boolean | null
          max_orders_per_month: number | null
          max_tables: number | null
          name: string
          price_monthly: number
          price_yearly: number | null
          tier: Database["public"]["Enums"]["subscription_tier"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          max_orders_per_month?: number | null
          max_tables?: number | null
          name: string
          price_monthly: number
          price_yearly?: number | null
          tier: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          max_orders_per_month?: number | null
          max_tables?: number | null
          name?: string
          price_monthly?: number
          price_yearly?: number | null
          tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string | null
        }
        Relationships: []
      }
      super_admin_profile: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          phone: string | null
          theme_preference: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          phone?: string | null
          theme_preference?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          phone?: string | null
          theme_preference?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      system_logs: {
        Row: {
          action: string
          actor_email: string | null
          actor_id: string | null
          created_at: string
          details: Json | null
          entity_id: string | null
          entity_type: string | null
          id: string
        }
        Insert: {
          action: string
          actor_email?: string | null
          actor_id?: string | null
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
        }
        Update: {
          action?: string
          actor_email?: string | null
          actor_id?: string | null
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
        }
        Relationships: []
      }
      table_sessions: {
        Row: {
          billing_at: string | null
          completed_at: string | null
          created_at: string | null
          food_ready_at: string | null
          id: string
          order_id: string | null
          order_placed_at: string | null
          restaurant_id: string
          seated_at: string | null
          served_at: string | null
          status: string | null
          table_id: string
        }
        Insert: {
          billing_at?: string | null
          completed_at?: string | null
          created_at?: string | null
          food_ready_at?: string | null
          id?: string
          order_id?: string | null
          order_placed_at?: string | null
          restaurant_id: string
          seated_at?: string | null
          served_at?: string | null
          status?: string | null
          table_id: string
        }
        Update: {
          billing_at?: string | null
          completed_at?: string | null
          created_at?: string | null
          food_ready_at?: string | null
          id?: string
          order_id?: string | null
          order_placed_at?: string | null
          restaurant_id?: string
          seated_at?: string | null
          served_at?: string | null
          status?: string | null
          table_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "table_sessions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "table_sessions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "table_sessions_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "table_sessions_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "table_sessions_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "tables"
            referencedColumns: ["id"]
          },
        ]
      }
      tables: {
        Row: {
          capacity: number | null
          created_at: string | null
          deleted_at: string | null
          id: string
          is_active: boolean | null
          qr_code_url: string | null
          restaurant_id: string
          status: string | null
          table_number: string
          updated_at: string | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          is_active?: boolean | null
          qr_code_url?: string | null
          restaurant_id: string
          status?: string | null
          table_number: string
          updated_at?: string | null
        }
        Update: {
          capacity?: number | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          is_active?: boolean | null
          qr_code_url?: string | null
          restaurant_id?: string
          status?: string | null
          table_number?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tables_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tables_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants_public"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          restaurant_id: string | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          restaurant_id?: string | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          restaurant_id?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants_public"
            referencedColumns: ["id"]
          },
        ]
      }
      variant_groups: {
        Row: {
          created_at: string
          display_order: number
          id: string
          is_required: boolean
          max_select: number
          menu_item_id: string
          min_select: number
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          is_required?: boolean
          max_select?: number
          menu_item_id: string
          min_select?: number
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          is_required?: boolean
          max_select?: number
          menu_item_id?: string
          min_select?: number
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "variant_groups_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
      variant_options: {
        Row: {
          created_at: string
          display_order: number
          id: string
          is_available: boolean
          name: string
          price_modifier: number
          variant_group_id: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          is_available?: boolean
          name: string
          price_modifier?: number
          variant_group_id: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          is_available?: boolean
          name?: string
          price_modifier?: number
          variant_group_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "variant_options_variant_group_id_fkey"
            columns: ["variant_group_id"]
            isOneToOne: false
            referencedRelation: "variant_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      waiter_calls: {
        Row: {
          created_at: string | null
          id: string
          reason: string | null
          responded_at: string | null
          responded_by: string | null
          restaurant_id: string
          status: string | null
          table_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          reason?: string | null
          responded_at?: string | null
          responded_by?: string | null
          restaurant_id: string
          status?: string | null
          table_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          reason?: string | null
          responded_at?: string | null
          responded_by?: string | null
          restaurant_id?: string
          status?: string | null
          table_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "waiter_calls_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "waiter_calls_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "waiter_calls_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "tables"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      orders_public: {
        Row: {
          created_at: string | null
          estimated_ready_at: string | null
          id: string | null
          order_number: number | null
          payment_method: string | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          ready_at: string | null
          restaurant_id: string | null
          service_charge: number | null
          special_instructions: string | null
          started_preparing_at: string | null
          status: Database["public"]["Enums"]["order_status"] | null
          subtotal: number | null
          table_id: string | null
          tax_amount: number | null
          total_amount: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          estimated_ready_at?: string | null
          id?: string | null
          order_number?: number | null
          payment_method?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          ready_at?: string | null
          restaurant_id?: string | null
          service_charge?: number | null
          special_instructions?: string | null
          started_preparing_at?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          subtotal?: number | null
          table_id?: string | null
          tax_amount?: number | null
          total_amount?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          estimated_ready_at?: string | null
          id?: string | null
          order_number?: number | null
          payment_method?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          ready_at?: string | null
          restaurant_id?: string | null
          service_charge?: number | null
          special_instructions?: string | null
          started_preparing_at?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          subtotal?: number | null
          table_id?: string | null
          tax_amount?: number | null
          total_amount?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "tables"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurants_public: {
        Row: {
          address: string | null
          ads_enabled: boolean | null
          banner_image_url: string | null
          cover_image_url: string | null
          currency: string | null
          description: string | null
          favicon_url: string | null
          font_family: string | null
          google_review_url: string | null
          id: string | null
          is_active: boolean | null
          logo_url: string | null
          menu_title: string | null
          name: string | null
          primary_color: string | null
          secondary_color: string | null
          slug: string | null
          theme_config: Json | null
        }
        Insert: {
          address?: string | null
          ads_enabled?: boolean | null
          banner_image_url?: string | null
          cover_image_url?: string | null
          currency?: string | null
          description?: string | null
          favicon_url?: string | null
          font_family?: string | null
          google_review_url?: string | null
          id?: string | null
          is_active?: boolean | null
          logo_url?: string | null
          menu_title?: string | null
          name?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          slug?: string | null
          theme_config?: Json | null
        }
        Update: {
          address?: string | null
          ads_enabled?: boolean | null
          banner_image_url?: string | null
          cover_image_url?: string | null
          currency?: string | null
          description?: string | null
          favicon_url?: string | null
          font_family?: string | null
          google_review_url?: string | null
          id?: string | null
          is_active?: boolean | null
          logo_url?: string | null
          menu_title?: string | null
          name?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          slug?: string | null
          theme_config?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      view_daily_sales_analytics: {
        Row: {
          date_key: number | null
          full_date: string | null
          day_name: string | null
          day_of_week: number | null
          is_weekend: boolean | null
          month_name: string | null
          quarter_name: string | null
          year_number: number | null
          restaurant_id: string | null
          restaurant_name: string | null
          restaurant_slug: string | null
          total_orders: number | null
          completed_orders: number | null
          cancelled_orders: number | null
          total_items_sold: number | null
          gross_sales: number | null
          tax_collected: number | null
          service_charge_collected: number | null
          discounts_given: number | null
          net_sales: number | null
          average_order_value: number | null
        }
        Relationships: []
      }
      view_menu_item_performance: {
        Row: {
          menu_item_id: string | null
          item_name: string | null
          food_type: string | null
          current_price: number | null
          category_name: string | null
          restaurant_id: string | null
          restaurant_name: string | null
          order_frequency: number | null
          total_quantity_sold: number | null
          total_gross_revenue: number | null
          total_net_revenue: number | null
          average_selling_price: number | null
        }
        Relationships: []
      }
      view_hourly_sales_heatmap: {
        Row: {
          hour_24: number | null
          hour_12: number | null
          am_pm: string | null
          time_bucket_hour: string | null
          meal_period: string | null
          restaurant_id: string | null
          restaurant_name: string | null
          order_count: number | null
          total_revenue: number | null
          total_items_sold: number | null
        }
        Relationships: []
      }
      view_customer_lifetime_value: {
        Row: {
          customer_dim_id: string | null
          customer_phone: string | null
          customer_name: string | null
          restaurant_id: string | null
          restaurant_name: string | null
          total_orders_count: number | null
          total_spent_amount: number | null
          average_spend_per_order: number | null
          first_order_date: string | null
          last_order_date: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_user_restaurant_id: { Args: { _user_id: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_scan_count: { Args: { qr_code_id: string }; Returns: undefined }
      is_restaurant_active: {
        Args: { _restaurant_id: string }
        Returns: boolean
      }
      complete_billing_transaction: {
        Args: {
          p_order_id: string
          p_payment_method: string
          p_discount_amount: number
          p_total_amount: number
          p_customer_name?: string | null
          p_customer_phone?: string | null
          p_notes?: string | null
          p_invoice_number?: string | null
          p_user_id?: string | null
        }
        Returns: string
      }
    }
    Enums: {
      app_role:
        | "super_admin"
        | "restaurant_admin"
        | "kitchen_staff"
        | "waiter_staff"
        | "billing_staff"
        | "manager"
      order_status:
        | "pending"
        | "confirmed"
        | "preparing"
        | "ready"
        | "served"
        | "billed"
        | "completed"
        | "cancelled"
      payment_status: "pending" | "paid" | "refunded"
      subscription_tier: "free" | "pro" | "enterprise"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "super_admin",
        "restaurant_admin",
        "kitchen_staff",
        "waiter_staff",
        "billing_staff",
        "manager",
      ],
      order_status: [
        "pending",
        "confirmed",
        "preparing",
        "ready",
        "served",
        "billed",
        "completed",
        "cancelled",
      ],
      payment_status: ["pending", "paid", "refunded"],
      subscription_tier: ["free", "pro", "enterprise"],
    },
  },
} as const
