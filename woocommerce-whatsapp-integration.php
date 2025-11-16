<?php
/**
 * Plugin Name: WooCommerce WhatsApp Integration
 * Description: Integrasi WhatsApp dengan WooCommerce untuk Miss Blossom
 * Version: 1.0
 * Author: Miss Blossom
 */

// Tambahkan tombol WhatsApp di halaman produk
add_action('woocommerce_after_add_to_cart_button', 'missblossom_whatsapp_button_product');

function missblossom_whatsapp_button_product() {
    global $product;
    
    $phone = '6282141733187';
    $product_name = $product->get_name();
    $product_url = get_permalink($product->get_id());
    $product_price = $product->get_price();
    
    $message = "Halo DigiMetaShop, saya tertarik dengan buku:\n\n";
    $message .= "*{$product_name}*\n";
    $message .= "Harga: Rp " . number_format($product_price, 0, ',', '.') . "\n";
    $message .= "Link: {$product_url}\n\n";
    $message .= "Apakah masih tersedia?";
    
    $whatsapp_url = 'https://wa.me/' . $phone . '?text=' . urlencode($message);
    
    echo '<a href="' . esc_url($whatsapp_url) . '" 
             class="button alt whatsapp-order-button" 
             target="_blank" 
             rel="noopener noreferrer"
             style="background: #25d366; 
                    color: white; 
                    margin-top: 10px; 
                    display: inline-block;
                    width: 100%;">
            <svg style="width: 20px; height: 20px; fill: white; vertical-align: middle; margin-right: 8px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
            </svg>
            Pesan via WhatsApp
          </a>';
}

// Tambahkan tombol WhatsApp di halaman shop/archive
add_action('woocommerce_after_shop_loop_item', 'missblossom_whatsapp_button_loop', 15);

function missblossom_whatsapp_button_loop() {
    global $product;
    
    $phone = '6282141733187';
    $product_name = $product->get_name();
    $product_url = get_permalink($product->get_id());
    
    $message = "Halo DigiMetaShop, saya ingin tanya tentang: {$product_name}";
    $whatsapp_url = 'https://wa.me/' . $phone . '?text=' . urlencode($message);
    
    echo '<a href="' . esc_url($whatsapp_url) . '" 
             class="button whatsapp-quick-button" 
             target="_blank"
             style="background: #25d366; 
                    color: white; 
                    margin-top: 5px; 
                    font-size: 12px;
                    padding: 8px 12px;">
            💬 Chat
          </a>';
}

// Notifikasi WhatsApp saat ada order baru
add_action('woocommerce_new_order', 'missblossom_notify_new_order', 10, 1);

function missblossom_notify_new_order($order_id) {
    $order = wc_get_order($order_id);
    
    $phone = '6282141733187';
    $customer_name = $order->get_billing_first_name() . ' ' . $order->get_billing_last_name();
    $order_total = $order->get_total();
    $order_url = $order->get_view_order_url();
    
    $message = "🔔 *ORDER BARU!*\n\n";
    $message .= "Order #" . $order_id . "\n";
    $message .= "Customer: {$customer_name}\n";
    $message .= "Total: Rp " . number_format($order_total, 0, ',', '.') . "\n";
    $message .= "Status: " . $order->get_status() . "\n\n";
    
    $items = $order->get_items();
    $message .= "Produk:\n";
    foreach ($items as $item) {
        $product_name = $item->get_name();
        $quantity = $item->get_quantity();
        $message .= "- {$product_name} (x{$quantity})\n";
    }
    
    $message .= "\nLihat order: {$order_url}";
    
    // Kirim notifikasi via WhatsApp API (opsional)
    // Atau bisa manual copy message ini dan kirim
    
    // Simpan message untuk admin
    update_post_meta($order_id, '_whatsapp_notification', $message);
}

// Tambahkan CSS
add_action('wp_head', 'missblossom_whatsapp_css');

function missblossom_whatsapp_css() {
    echo '<style>
        .whatsapp-order-button:hover {
            background: #128C7E !important;
        }
        .whatsapp-quick-button:hover {
            background: #128C7E !important;
        }
    </style>';
}

// Shortcode untuk tombol WhatsApp custom
// Usage: [whatsapp_contact text="Hubungi Kami"]
add_shortcode('whatsapp_contact', 'missblossom_whatsapp_contact_shortcode');

function missblossom_whatsapp_contact_shortcode($atts) {
    $atts = shortcode_atts(array(
        'text' => 'Chat via WhatsApp',
        'phone' => '6282141733187',
        'message' => 'Halo Miss Blossom!'
    ), $atts);
    
    $url = 'https://wa.me/' . $atts['phone'] . '?text=' . urlencode($atts['message']);
    
    return '<a href="' . esc_url($url) . '" 
               class="button whatsapp-contact-button" 
               target="_blank"
               style="background: #25d366; color: white; display: inline-block; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
                ' . esc_html($atts['text']) . '
            </a>';
}
