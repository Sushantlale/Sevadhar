import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  BookOpen,
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Construction,
  Dog,
  Hammer,
  Heart,
  Home,
  Layers,
  Leaf,
  MapPin,
  Mic,
  Scissors,
  Search,
  Sprout,
  Stethoscope,
  Store,
  Trash2,
  Truck,
  Users,
  Wrench,
  X
} from 'lucide-react-native';
import React, { useRef, useState } from 'react';

import {
  Dimensions,
  // Image,
  ImageBackground,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

/* ===========================
   SEARCH CATEGORIES DATA (For Modal)
=========================== */
const sevadharCategories = [
  { id: '1', name: 'Home Help', icon: Home, color: '#FF7A00' },
  { id: '2', name: 'Repairs', icon: Wrench, color: '#3B82F6' },
  { id: '3', name: 'Construction', icon: Construction, color: '#F59E0B' },
  { id: '4', name: 'Gardening', icon: Leaf, color: '#10B981' },
  { id: '5', name: 'Scrap & Pheri', icon: Trash2, color: '#6B7280' },
  { id: '6', name: 'Religious', icon: Users, color: '#8B5CF6' },
  { id: '7', name: 'Wellness', icon: Heart, color: '#EC4899' },
  { id: '8', name: 'Food Vendors', icon: Store, color: '#EF4444' },
  { id: '9', name: 'Education', icon: BookOpen, color: '#10B981' },
  { id: '10', name: 'Clothing', icon: Scissors, color: '#F97316' },
  { id: '11', name: 'Pets', icon: Dog, color: '#3B82F6' },
  { id: '12', name: 'Healthcare', icon: Stethoscope, color: '#EF4444' },
  { id: '13', name: 'Events', icon: Calendar, color: '#8B5CF6' },
  { id: '14', name: 'Hardware', icon: Hammer, color: '#4B5563' },
  { id: '15', name: 'Traditional', icon: Hammer, color: '#D97706' },
  { id: '16', name: 'Transport', icon: Truck, color: '#2563EB' },
  { id: '17', name: 'Professional', icon: Briefcase, color: '#1F2937' },
  { id: '18', name: 'Design', icon: Layers, color: '#059669' },
  { id: '19', name: 'Arts & Media', icon: Clapperboard, color: '#7C3AED' },
  { id: '20', name: 'Agriculture', icon: Sprout, color: '#15803D' },
];

/* ===========================
   ALL SERVICES DATA
=========================== */
const categories = [
  // --- LOCAL WORKER SECTION (ID 1-14) ---
  {
    id: '1',
    name: 'Household Help & Cleaning',
    services: [
      { name: 'Aquarium Cleaner', slug: 'aquarium-cleaner', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836327/Aquarium-Cleaner_bg8xlu.jpg' },
      { name: 'Babysitter', slug: 'babysitter', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836328/Babysitter_wozhrz.jpg' },
      { name: 'Car Cleaner', slug: 'car-cleaner', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836330/Car-Cleaner_ao6hzb.jpg'},
      { name: 'Cook Private Chef', slug: 'cook', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836332/Cook-Private_Chef_ned3lg.jpg' },
      { name: 'Home Cleaning', slug: 'home-cleaning', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836334/Home-Cleaning_kxd78s.jpg' },
      { name: 'Home Nurse', slug: 'home-nurse', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836317/Home-Nurse_paq6eu.jpg' },
      { name: 'Iron Press', slug: 'iron-press', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836318/Iron-Press_dcuqz1.jpg' },
      { name: 'Laundry Dry Cleaning', slug: 'laundry', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836320/Laundry-Dry-Cleaning_eatmos.jpg' },
      { name: 'Maid', slug: 'maid', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836321/Maid_c1ntmu.jpg' },
      { name: 'Toilet Cleaning', slug: 'toilet-cleaning', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836323/Toilet-Cleaning_ajwgbi.jpg' },
      { name: 'Water Tank Cleaner', slug: 'water-tank', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836324/Water-Tank-Cleaner_agkwrg.jpg' },
    ],
  },
  {
    id: '2',
    name: 'Repair, Maintenance & Technical',
    services: [
      { name: 'AC Repair', slug: 'ac-repair', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836466/AC-Repair_eime2a.jpg' },
      { name: 'Carpenter', slug: 'carpenter', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836467/Carpenter_kizqc7.jpg' },
      { name: 'Computer Laptop Technician', slug: 'comp-tech', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836469/Computer-Laptop-Technician_ko3ch5.jpg' },
      { name: 'Electrician', slug: 'electrician', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836439/Electrician_iswwps.jpg' },
      { name: 'Fan Tv Fridge Repair', slug: 'appliance-repair', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836440/Fan_Tv_Fridge-Repair_tddhxb.jpg' },
      { name: 'Inverter Battery Technician', slug: 'inverter-tech', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836442/Inverter-_-Battery-Technician_pferp8.jpg' },
      { name: 'Key Maker', slug: 'key-maker', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836445/Key-Maker_zhykqi.jpg' },
      { name: 'Mechanic', slug: 'mechanic', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836446/Mechanic_wlqvu7.jpg' },
      { name: 'Mobile Repair', slug: 'mobile-repair', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836449/Mobile-Repair_bptxth.jpg' },
      { name: 'Painter', slug: 'painter', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836451/Painter_krnixd.jpg' },
      { name: 'Plumber', slug: 'plumber', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836453/Plumber_lnxces.jpg' },
      { name: 'RO Water Purifier Service', slug: 'ro-service', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836456/RO-Water-Purifier-Service_xzdw6j.jpg' },
    ],
  },
  {
    id: '3',
    name: 'Construction & Labor Services',
    services: [
      { name: 'Coli', slug: 'coolie', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836513/Coli_ie6mdz.jpg' },
      { name: 'Construction Labor', slug: 'labor', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836516/Construction-Labor_vlqtrl.jpg' },
      { name: 'Demolition Worker', slug: 'demolition', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836518/Demolition-Worker_qo7skf.jpg' },
      { name: 'Driller (Wall Concrete)', slug: 'driller', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836492/Driller-_WallConcrete_hggzih.jpg' },
      { name: 'POP Worker', slug: 'pop-worker', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836494/POP-Worker_vigugj.jpg' },
      { name: 'Tiles & Marble Worker', slug: 'tiles-worker', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836497/Tiles-_-Marble-Worker_dsfsff.jpg' },
      { name: 'Welder Fabrication Worker', slug: 'welder', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836500/Welder-Fabrication-Worker_usqfwd.jpg'},
    ],
  },
  {
    id: '4',
    name: 'Gardening & Outdoor Services',
    services: [
      { name: 'Grass Cutter or Bush Trimmer', slug: 'grass-cutter', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836551/Grass-Cutter-Bush-Trimmer_woerop.jpg' },
      { name: 'Mali Gardener', slug: 'gardener', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836543/Mali-Gardener_c6fyf8.jpg' },
      { name: 'Nursery Supplier', slug: 'nursery', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836545/Nursery-Supplier_wxadvy.jpg' },
      { name: 'Pest Control', slug: 'pest-control', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836549/Pest-Control-Service_f5ekie.jpg' },
    ],
  },
  {
    id: '5',
    name: 'Scrap & Utility (Pheri) Services',
    services: [
      { name: 'Glass and Bottle Buyer', slug: 'glass-buyer', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836688/Glass-_-Bottle-Buyer_kfcidl.jpg' },
      { name: 'Knife Sharpener', slug: 'knife-sharpener', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836692/Knife-Sharpener_oaqmsb.jpg' },
      { name: 'Old Clothes Exchange', slug: 'clothes-exchange', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836680/Old-Clothes-Exchange-_Bartan-wala_sn98ge.jpg' },
      { name: 'Raddi Dealer', slug: 'raddi-dealer', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836683/Raddi-Dealer_zksyrp.jpg' },
      { name: 'Scrap Dealer', slug: 'scrap-dealer', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836686/Scrap-Dealer_g7p4eb.jpg' },
    ],
  },
  {
    id: '6',
    name: 'Religious & Community Services',
    services: [
      { name: 'Astrologer Palm Reader', slug: 'astrologer', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836801/Astrologer--Palm-Reader_vdlpsj.jpg' },
      { name: 'Bhajan Kirtankar', slug: 'bhajan', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836806/Bhajan-Kirtankar_zy8ep4.jpg' },
      { name: 'Crematorium Helper', slug: 'crematorium-helper', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836789/Crematorium-Helper_gteyss.jpg' },
      { name: 'Pandit', slug: 'pandit', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836792/Pandit_w2p84u.jpg' },
      { name: 'Pujari', slug: 'pujari', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836795/Pujari_ea68l1.jpg' },
      { name: 'Vastu-Consultant', slug: 'vastu', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768836799/Vastu-Consultant_bnvzsv.jpg' },
    ],
  },
  {
    id: '7',
    name: 'Personal Care & Wellness',
    services: [
      { name: 'MakeUp', slug: 'makeup', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838410/MakeUp_hhn6yk.jpg' },
      { name: 'Massage', slug: 'massage', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838384/Massage_reifrr.jpg' },
      { name: 'Mehendi Artist', slug: 'mehendi', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838386/Mehendi-Artist_be3xye.jpg' },
      { name: 'Tattoo Artist', slug: 'tattoo', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838391/Tattoo-Artist_u5ygcz.jpg' },
    ],
  },
  {
    id: '8',
    name: 'Food & Beverage Vendors',
    services: [
      { name: 'Milk Vendor', slug: 'milk-vendor', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838438/Milk-Vendor_g1lutb.jpg' },
      { name: 'Snacks Seller', slug: 'snacks-seller', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838449/Snacks-Seller_cqpxhl.jpg' },
      { name: 'Vegetable Seller', slug: 'veg-seller', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838452/Vegetable-Seller_rxcsji.jpg' },
      { name: 'Catering & Tiffin Service', slug: 'tiffin', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838457/Catering-_-Tiffin-_Dabba_-Service_zhwwrq.jpg' },
      { name: 'Coconut Water Seller', slug: 'coconut-water', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838467/Coconut-Water-Seller_asg2ta.jpg' },
      { name: 'Egg Seller', slug: 'egg-seller', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838471/Egg-Seller_vmymxn.jpg' },
      { name: 'Grains & Flour Mill', slug: 'flour-mill', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838475/Grains-_-Flour-Mill-_Atta-Chakki_nvfaa2.jpg' },
      { name: 'Meat Seller', slug: 'meat-seller', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838434/Meat-Seller_vsfnbd.jpg' },
    ],
  },
  {
    id: '9',
    name: 'Education & Knowledge Services',
    services: [
      { name: 'Book Seller', slug: 'book-seller', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838496/Book-Seller_djcubj.jpg' },
      { name: 'Dance Teacher', slug: 'dance-teacher-local', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838502/Dance-Teacher_pmucsh.jpg' },
      { name: 'Home Tutor', slug: 'tutor-local', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838508/Home_Tutor_ysjytm.jpg' },
      { name: 'Music Teacher', slug: 'music-teacher-local', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838487/Music-Teacher_qljl9r.jpg' },
      { name: 'Newspaper Services', slug: 'newspaper', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838492/Newspaper-Services_ji0ytw.jpg' },
    ],
  },
  {
    id: '10',
    name: 'Clothing, Accessories & Tailoring',
    services: [
      { name: 'Button & Needle Seller', slug: 'button-seller', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838617/Button-_-Needle-Seller_bsnb45.jpg' },
      { name: 'Clothes Seller', slug: 'clothes-seller-local', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838621/Clothes-Seller_d82bnc.jpg' },
      { name: 'Jewellery Repair', slug: 'jewel-repair', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838627/Jewellery-Repair_cowzd8.jpg' },
      { name: 'Spectacles Seller', slug: 'specs-seller', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838648/Spectacles-seller_qqgil9.jpg' },
      { name: 'Tailor', slug: 'tailor', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838593/Tailor_ll6i93.jpg' },
      { name: 'Watch Repairer', slug: 'watch-repair', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838606/Watch-Repairer_cjfcbp.jpg' },
      { name: 'Zari Worker', slug: 'zari-worker', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838612/Zari-Worker_vnaztx.jpg' },
    ],
  },
  {
    id: '11',
    name: 'Event, Decoration & Creative Services',
    services: [
      { name: 'Designing Gifts', slug: 'gift-design', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838671/Designing-Gifts_f9eyf4.jpg' },
      { name: 'Event Decoration Supplier', slug: 'deco-supplier', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838653/Event_Decoration_Supplier_kilbaq.jpg' },
      { name: 'Tent & Chair Supplier', slug: 'pandal', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838659/Tent-_-Chair-Supplier-_Pandal_kkordn.jpg' },
    ],
  },
  {
    id: '12',
    name: 'Traditional & Specialized Micro-Services',
    services: [
      { name: 'Bangle Seller', slug: 'bangle-seller', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838773/Bangle-Seller-_Manari_kwdkkl.jpg' },
      { name: 'Basket Weaver', slug: 'basket-weaver', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838777/Basket-Weaver-Cane-Worker_wxnq9z.jpg' },
      { name: 'Chambhar (Cobbler)', slug: 'cobbler', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838733/Chambhar-_Cobbler_znbuav.jpg' },
      { name: 'Flower Seller', slug: 'flower-seller', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838749/Flower-Seller_pgi58s.jpg' },
      { name: 'Potter (Matka Clay Items)', slug: 'potter', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838754/Potter-_MatkaClay-items_ldt5lm.jpg' },
      { name: 'Utensils Provider', slug: 'utensils', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838759/Utensils-Provider_iugsuy.jpg' },
    ],
  },
  {
    id: '13',
    name: 'Driving & Transport Services',
    services: [
      { name: 'Ambulance Driver', slug: 'ambulance-driver', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838842/Ambulance-Driver_vczh5a.jpg' },
      { name: 'Auto Driver', slug: 'auto-driver', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838848/Auto-Driver_bcqt2m.jpg' },
      { name: 'Bus Driver', slug: 'bus-driver', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838860/Bus-Driver_ysurec.jpg' },
      { name: 'Delivery Rider', slug: 'delivery-rider', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838866/Delivery-Rider-_FoodParcel_yjwqz2.jpg' },
      { name: 'JCB Crane Operator', slug: 'jcb-operator', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838902/JCB-Crane-Operator_l5htni.jpg' },
      { name: 'Private Chauffeur', slug: 'chauffeur', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838782/Private-Chauffeur-_Valet_oc5kq7.jpg' },
      { name: 'Taxi Driver', slug: 'taxi-driver', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838787/Taxi-Driver_ifbkik.jpg' },
      { name: 'Tempo & Mini Van Driver', slug: 'tempo-driver', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838791/Tempo-Mini-Van-Driver_iwgn8l.jpg' },
      { name: 'Tractor Driver', slug: 'tractor-driver', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838817/Tractor-Driver_ufxkr8.jpg' },
      { name: 'Truck Driver', slug: 'truck-driver', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838843/Truck-Driver_ahstks.jpg' },
    ],
  },
  {
    id: '14',
    name: 'Training and Teaching Services',
    services: [
      { name: 'Corporate Trainers', slug: 'corp-trainer', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839027/Corporate-Trainers_r6xpvp.jpg' },
      { name: 'Dance Teacher', slug: 'dance-train', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839034/Dance-Teacher_grwocp.jpg' },
      { name: 'Gym Trainer', slug: 'gym-train', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839039/Gym-Trainer_xwmcjc.jpg' },
      { name: 'Home Tutor', slug: 'tutor-train', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838930/Home_Tutor_kx933s.jpg' },
      { name: 'Music Teacher', slug: 'music-train', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768838937/Music-Teacher_pwmahl.jpg' },
      { name: 'Sales Trainers', slug: 'sales-train', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839013/Sales-Trainers_imvmzl.jpg' },
      { name: 'Yoga Trainer', slug: 'yoga-train', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839021/Yoga-Trainer_zkpc6m.jpg' },
    ],
  },

  // --- PROFESSIONAL SECTION (ID 15-17) ---
  {
    id: '15',
    name: 'Professional Profession',
    services: [
      { name: 'Accountant', slug: 'accountant', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840415/Accountant_fvqnfi.jpg' },
      { name: 'Construction Builder', slug: 'builder', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840422/Construction_Builder_im4py6.jpg' },
      { name: 'Dentist', slug: 'dentist', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840427/Dentist_gsyzw6.jpg' },
      { name: 'DJ Provider', slug: 'dj', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840433/DJ-Provider_d5bgiu.jpg' },
      { name: 'Doctor', slug: 'doctor', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840438/Doctor_u7opn0.jpg' },
      { name: 'Gym', slug: 'gym-pro', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840445/Gym_laqrc9.jpg' },
      { name: 'Insurance Agent', slug: 'insurance', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840451/Insurance-Agent_b8gba0.jpg' },
      { name: 'Journalist/media', slug: 'journalist', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840457/Journalist-media_myucor.jpg' },
      { name: 'Lawer', slug: 'lawyer', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840464/Lawer_nyrmtw.jpg' },
      { name: 'Nurse', slug: 'nurse-pro', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840471/Nurse_jlvhhs.jpg' },
      { name: 'Photographer', slug: 'photographer', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840477/Photographer_a2g1m5.jpg' },
      { name: 'Photography Studio', slug: 'photo-studio', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840484/Photography-Studio_rvx3ca.jpg' },
      { name: 'Real Estate Agent', slug: 'real-estate', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840490/Real-Estate-Agent_lih1su.jpg' },
      { name: 'Travel Agency', slug: 'travel-agency', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840497/Travel-Agency_qo3wc9.jpg' },
      { name: 'Typist Document Writer', slug: 'typist', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840410/Typist--Document-Writer_rm0bmu.jpg' },
    ],
  },
  {
    id: '16',
    name: 'Architecture & Designer Professionals',
    services: [
      { name: 'Architectural Design', slug: 'architect', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840082/Architectural-Design_r3uist.jpg' },
      { name: 'Civil Contractor', slug: 'civil-contractor', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840088/Civil-Contractor--Builder_tgi289.jpg' },
      { name: 'Interior Designers', slug: 'interior-designer', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840072/Interior-Designers_laxjzb.jpg' },
      { name: 'UX/UI Designer', slug: 'uiux-designer', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840077/UX-UI-Designer_yirinc.jpg' },
    ],
  },
  {
    id: '17',
    name: 'Arts, Entertainment & Media',
    services: [
      { name: 'Actor', slug: 'actor', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840234/Actor_kmexkc.jpg' },
      { name: 'Actress', slug: 'actress', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840242/Actress_zez4ak.jpg' },
      { name: 'Choreographer', slug: 'choreographer', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840254/Choreographer_kpkcwl.jpg' },
      { name: 'Dancer', slug: 'dancer-pro', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840167/Dancer_p7akro.jpg' },
      { name: 'Musician', slug: 'musician-pro', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840175/Musician_bij3a9.jpg' },
      { name: 'Painter or Sketch Artist', slug: 'artist-pro', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840181/Painter_or_Sketch_Artist_lgyv1c.jpg' },
      { name: 'Singer', slug: 'singer-pro', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840205/Singer_bhawzj.jpg' },
      { name: 'Voiceover Artist', slug: 'voiceover', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840225/Voiceover-Artist_po27xa.jpg' },
    ],
  },

  // --- SHOPS SECTION (ID 18-32) ---
  {
    id: '18',
    name: 'Home & Living',
    services: [
      { name: 'Home Decor Shop', slug: 'decor-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839177/Home-Decor-Shop_pg4qcd.jpg' },
      { name: 'Mattress Store', slug: 'mattress-store', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839099/Mattress-Store_t7jfkk.jpg' },
      { name: 'Paint Shop', slug: 'paint-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839113/Paint-Shop_mfsg44.jpg' },
      { name: 'Plywood & Timber Shop', slug: 'plywood-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839119/Plywood-_-Timber-Shop_lcssoj.jpg' },
      { name: 'Curtain & Blinds Shop', slug: 'curtain-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839124/Curtain-_-Blinds-Shop_rokcsr.jpg' },
      { name: 'Furniture Shop', slug: 'furniture-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839138/Furniture-Shop_lcy37z.jpg' },
      { name: 'Glass & Aluminum Shop', slug: 'glass-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839150/Glass-_-Aluminum-Shop_pmnsef.jpg' },
    ],
  },
  {
    id: '19',
    name: 'Automobile & Transport',
    services: [
      { name: 'Battery Shop', slug: 'battery-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839237/Battery-Shop_zz3yuq.jpg' },
      { name: 'Bike Repair Shop', slug: 'bike-repair', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839258/Bike-Repair-Shop_dhgce7.jpg' },
      { name: 'Bike Showroom', slug: 'bike-showroom', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839263/Bike-Showroom_wzlkri.jpg' },
      { name: 'Bike Washing Center', slug: 'bike-wash', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839270/Bike-Washing-Center_oapzgv.jpg' },
      { name: 'Car Accessories Shop', slug: 'car-accessories', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839184/Car-Accessories-Shop_zvdgoz.jpg' },
      { name: 'Car Service Center', slug: 'car-service', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839199/Car-Service-Center_caxh0l.jpg' },
      { name: 'Car Showroom', slug: 'car-showroom', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839204/Car-Showroom_ybiy6b.jpg' },
      { name: 'Car Washing Center', slug: 'car-wash-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839210/Car-Washing-Center_scckgv.jpg' },
      { name: 'Tyre Shop', slug: 'tyre-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839228/Tyre-Shop_viihbo.jpg' },
      { name: 'Used Car Dealer', slug: 'used-car', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839233/Used-Car-Dealer_ppsiqj.jpg' },
    ],
  },
  {
    id: '20',
    name: 'Food & Beverage',
    services: [
      { name: 'Bakery Shop', slug: 'bakery', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839385/Bakery-shop_ezhcfe.jpg' },
      { name: 'Cake Shop', slug: 'cake-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839390/Cake-Shop_zif83a.jpg' },
      { name: 'Coffee Shop', slug: 'coffee-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839404/Coffee-Shop_copjs8.jpg' },
      { name: 'Dhaba', slug: 'dhaba', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839285/Dhaba_eolzpa.jpg' },
      { name: 'Fast Food Center', slug: 'fast-food', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839302/Fast-Food-Center_tjzrpe.jpg' },
      { name: 'Fruit Seller', slug: 'fruit-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839308/Fruit-Seller_dngo48.jpg' },
      { name: 'Grain Seller', slug: 'grain-seller', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839314/Grain_Seller_ag2ulm.jpg' },
      { name: 'Hotel Services', slug: 'hotel-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839328/Hotel-Services_fxnzpa.jpg' },
      { name: 'Ice-Cream Seller', slug: 'ice-cream-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839333/Ice-Cream-Seller_myziez.jpg' },
      { name: 'Juice Seller', slug: 'juice-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839338/Juice-Seller_yrzgkt.jpg' },
      { name: 'Restaurant Services', slug: 'restaurant', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839354/Restaurant-Services_inii2j.jpg' },
      { name: 'Sweet Seller (Halwai)', slug: 'sweet-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839363/Sweet-Seller-_Halwai_bohqzf.jpg' },
      { name: 'Tea Shop', slug: 'tea-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839369/Tea-Shop_u1nb3m.jpg' },
    ],
  },
  {
    id: '21',
    name: 'Daily Needs & Retail',
    services: [
      { name: 'General Store', slug: 'general-store', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839503/General-Store_btw9fr.jpg' },
      { name: 'Grocery Shop', slug: 'grocery-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839516/Grocery-Shop_qc0ugs.jpg' },
      { name: 'Kirana Shop', slug: 'kirana-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839491/Kirana-Shop_oafimw.jpg' },
      { name: 'Supermarket', slug: 'supermarket', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839497/Supermarket_lcwxn6.jpg' },
    ],
  },
  {
    id: '22',
    name: 'Fashion & Lifestyle',
    services: [
      { name: 'Fashion Accessories Shop', slug: 'fashion-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839452/Fashion-Accessories-Shop_mfsfs4.jpg' },
      { name: 'Footwear Store', slug: 'footwear-store', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839459/Footwear-Store_dfenmh.jpg' },
      { name: 'Hair Salon', slug: 'hair-salon-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839473/Hair-Salon_uo35br.jpg' },
      { name: 'Kids Wear Shop', slug: 'kids-wear', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839411/Kids-Wear-Shop_nat0vw.jpg' },
      { name: "Men's Wear Shop", slug: 'mens-wear', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839428/Men_s-Wear-Shop_twff4h.jpg' },
      { name: 'Saree Shop', slug: 'saree-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839434/Saree-Shop_llzzms.jpg' },
      { name: "Women's Wear Shop", slug: 'womens-wear', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839447/Women_s-Wear-Shop_xa36xg.jpg' },
    ],
  },
  {
    id: '23',
    name: 'Jewelry & Luxury',
    services: [
      { name: 'Diamond Jewelry Store', slug: 'diamond-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839657/Diamond-Jewelry-Store_qhzjbf.jpg' },
      { name: 'Gold & Silver Shop', slug: 'gold-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839633/Gold-_-Silver-Shop_ljtkts.jpg' },
      { name: 'Jewelry Shop', slug: 'jewelry-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839639/Jewelry-Shop_zkzawt.jpg' },
      { name: 'Watch Store', slug: 'watch-store', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839645/Watch-Store_z8puer.jpg' },
    ],
  },
  {
    id: '24',
    name: 'Beauty & Wellness',
    services: [
      { name: 'Beauty Parlor', slug: 'beauty-parlor', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839788/Beauty-Parlour_ddmj40.jpg' },
      { name: 'Cosmetic Store', slug: 'cosmetic-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839792/Cosmetic-Store_mybizv.jpg' },
      { name: 'Fitness Studio', slug: 'fitness-studio', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839753/Fitness-Studio_lvnpjr.jpg' },
      { name: 'Salon', slug: 'salon-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839762/Salon_dguete.jpg' },
      { name: 'Spa & Massage Center', slug: 'spa-center', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839769/Spa-_-Massage-Center_t9typm.jpg' },
      { name: 'Yoga', slug: 'yoga-studio', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839774/Yoga_fbid11.jpg' },
    ],
  },
  {
    id: '25',
    name: 'Health & Medical',
    services: [
      { name: 'Clinic', slug: 'clinic-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839843/Clinic_ksmeyf.jpg' },
      { name: 'Dental-Clinic', slug: 'dental-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839854/Dental-Clinic_kirl0g.jpg' },
      { name: 'Medical-Store', slug: 'medical-store', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839833/Medical-Store_xfl3wd.jpg' },
      { name: 'Pharmacy', slug: 'pharmacy-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839838/Pharmacy_y1exl5.jpg' },
    ],
  },
  {
    id: '26',
    name: 'Services & Repairs',
    services: [
      { name: 'AC Repair', slug: 'ac-repair-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839612/AC-Repair_pbacrl.jpg' },
      { name: 'Carpenter', slug: 'carpenter-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839619/Carpenter_rnefrj.jpg' },
      { name: 'Computer & Laptop Technician', slug: 'comp-tech-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839532/Computer-Laptop-Technician_t3iw9h.jpg' },
      { name: 'Electrician', slug: 'electrician-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839538/Electrician_cuiedr.jpg' },
      { name: 'Fan Tv Fridge-Repair', slug: 'appliance-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839553/Fan_Tv_Fridge-Repair_kbpqdh.jpg' },
      { name: 'Inverter & Battery Technician', slug: 'inverter-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839558/Inverter-_-Battery-Technician_ftdyim.jpg' },
      { name: 'Mechanic', slug: 'mechanic-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839577/Mechanic_wgp6tl.jpg' },
      { name: 'Mobile Repair', slug: 'mobile-repair-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839583/Mobile-Repair_zgpuol.jpg' },
      { name: 'Plumber', slug: 'plumber-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839599/Plumber_bkw9g1.jpg' },
      { name: 'RO Water Purifier Service', slug: 'ro-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839607/RO-Water-Purifier-Service_kalzpw.jpg' },
    ],
  },
  {
    id: '27',
    name: 'Electronics & Appliances',
    services: [
      { name: 'CCTV & Security Shop', slug: 'cctv-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839875/CCTV-_-Security-Shop_koo6n6.jpg' },
      { name: 'Computer Shop', slug: 'computer-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839879/Computer-Shop_tmpbdh.jpg' },
      { name: 'Electronics Shop', slug: 'electronics-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839884/Electronics-Shop_fdfo2p.jpg' },
      { name: 'Home Appliances Store', slug: 'appliance-store', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839860/Home-Appliances-Store_xclvi3.jpg' },
      { name: 'Mobile Store', slug: 'mobile-store', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839865/Mobile-Store_yhrycm.jpg' },
      { name: 'Printer & Accessories Store', slug: 'printer-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839870/Printer-_-Accessories-Store_kjf7z5.jpg' },
    ],
  },
  {
    id: '28',
    name: 'Education & Offices',
    services: [
      { name: 'Book Store', slug: 'book-store', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839910/Book-Store_bf07uy.jpg' },
      { name: 'Coaching Classes', slug: 'coaching', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839890/Coaching-Classes_sfftse.jpg' },
      { name: 'Computer Training Institute', slug: 'comp-inst', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839895/Computer-Training-Institute_zvbjkb.jpg' },
      { name: 'Printing & Xerox Shop', slug: 'xerox-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839900/Printing-and-Xerox-Shop_x7xeyd.jpg' },
      { name: 'Stationary Shop', slug: 'stationary-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839905/Stationary-Shop_pqgpqs.jpg' },
    ],
  },
  {
    id: '29',
    name: 'Construction & Industrial',
    services: [
      { name: 'Building Material Supplier Shop', slug: 'building-mat', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839703/Building-Material-Supplier-shop_ynyykp.jpg' },
      { name: 'Cement', slug: 'cement-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839707/Cement_fzweef.jpg' },
      { name: 'Electrical Materials', slug: 'electrical-mat', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839718/Electrical-Materials_l7sxnv.jpg' },
      { name: 'Fabrication', slug: 'fab-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839675/Fabrication_qtcjub.jpg' },
      { name: 'Sanitaryware', slug: 'sanitary-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839682/Sanitaryware_wrl450.jpg' },
      { name: 'Welding Works', slug: 'welding-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839698/Welding-Works_dtgpdu.jpg' },
    ],
  },
  {
    id: '30',
    name: 'Pets & Animals',
    services: [
      { name: 'Aquarium', slug: 'aquarium-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840110/Aquarium_mznnyi.jpg' },
      { name: 'Pet Birds Shop', slug: 'bird-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840658/Pet-Birds-Shop_lzjxms.jpg' },
      { name: 'Pet Dogs Shop', slug: 'dog-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840100/Pet-Dogs-Shop_gpwjph.jpg' },
      { name: 'Pet Food', slug: 'pet-food-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768840106/Pet-Food_um32si.jpg' },
    ],
  },
  {
    id: '31',
    name: 'Events & Miscellaneous',
    services: [
      { name: 'Event Organizer', slug: 'event-org', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839827/Event-Organizer_a5vkjq.jpg' },
      { name: 'Gift Shop', slug: 'gift-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839807/Gift-Shop_uirw3t.jpg' },
      { name: 'Marriage Hall Organizer', slug: 'marriage-hall', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839815/Marriage-Hall-Organizer_zbu8me.jpg' },
    ],
  },
  {
    id: '32',
    name: 'Hardware & Tools Shops',
    services: [
      { name: 'Carpentry Tools Shop', slug: 'carpentry-tools', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839990/Carpentry-Tools-Shop_mvsmxj.jpg' },
      { name: 'Hardware Parts Shop', slug: 'hardware-shop', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839997/Hardware-Parts-Shop_asi5gz.jpg' },
      { name: 'Plumbing Equipment Shop', slug: 'plumbing-equip', image: 'https://res.cloudinary.com/dsukdqmqv/image/upload/v1768839984/Plumbing-Equipment-Shop_sqdwxw.jpg' },
    ],
  },
];

// Flatten all services for search suggestions logic
const allServicesList = categories.flatMap(cat => cat.services.map(s => s.name));

export default function ServicesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'local' | 'pro' | 'shops'>('local');

  // --- SEARCH STATES (SYNCHRONIZED WITH HOME) ---
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState(['Plumber', 'AC Repair', 'Electrician', 'Home Cleaning']);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);

  // Carousel Logic
  const scrollRefs = useRef<Record<string, ScrollView | null>>({});
  const scrollPositions = useRef<Record<string, number>>({});

  // Get device width for calculations
  const scrollByOffset = (categoryId: string, direction: 'left' | 'right') => {
    const scrollRef = scrollRefs.current[categoryId];
    if (!scrollRef) return;
    const itemWidth = width * 0.44 + 15;
    const currentX = scrollPositions.current[categoryId] || 0;
    const nextX = direction === 'right' ? currentX + itemWidth : Math.max(0, currentX - itemWidth);
    scrollPositions.current[categoryId] = nextX;
    scrollRef.scrollTo({ x: nextX, animated: true });
  };

  // Voice Search Modal States
  const [voiceModalVisible, setVoiceModalVisible] = useState(false); 
  const [voiceStep, setVoiceStep] = useState<'listening' | 'result'>('listening');
  

  // Handle Voice Search Trigger
  const handleVoiceTrigger = () => {
  setSearchVisible(false); // 👈 close search modal if open
  setVoiceStep('listening');
  setVoiceModalVisible(true);
  
  // Simulate voice processing delay
  setTimeout(() => { 
    setVoiceStep('result'); 
  }, 2000);
 };

  // Group items into vertical pairs for two-row layout
  const groupIntoVerticalPairs = (items: any[]) => {
    const pairs = [];
    for (let i = 0; i < items.length; i += 2) {
      pairs.push(items.slice(i, i + 2));
    }
    return pairs;
  };

  // Filter Categories logic based on active tab
  const filteredCategories = categories.filter(cat => {
    const id = parseInt(cat.id);
    if (activeTab === 'local') return id <= 14;
    if (activeTab === 'pro') return id >= 15 && id <= 17;
    return id >= 18;
  });

  // Handle Search Submission (Immediate Navigation)
  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      // Logic: limit to 7 items, remove duplicates
      setSearchHistory(prev => {
        const filtered = prev.filter(item => item.toLowerCase() !== query.toLowerCase());
        return [query, ...filtered].slice(0, 7);
      });

      const slug = query.toLowerCase().replace(/\s+/g, '-');
      setSearchVisible(false);
      setSearchQuery('');
      setSearchSuggestions([]);
      router.push({ pathname: '/service/[id]', params: { id: slug } } as any);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* 1. HEADER SECTION */}
        <ImageBackground source={require("../../assets/images/header-bg.png")} style={styles.heroBg}>
          <SafeAreaView style={styles.heroSafeArea}>
            <View style={styles.topRow}>
              <View style={styles.locationContainer}>
                <MapPin size={16} color="#FFF" />
                <Text style={styles.locationText}>Khopoli</Text>
              </View>
            </View>

            <Text style={styles.heroText}>Which Services are{"\n"}You Searching For?</Text>

            {/* FAKE SEARCH BAR (Triggering Modal) */}
            <View style={styles.heroSearchContainer}>
              <TouchableOpacity activeOpacity={1} style={styles.heroSearchBar} onPress={() => setSearchVisible(true)}>
                <Search size={20} color="#FFF" style={{ marginRight: 10 }} />
                <Text style={{ color: '#DDD', fontSize: 15 }}>Search services...</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.heroMicBtn} onPress={handleVoiceTrigger}>
                <Mic size={22} color="#FFF" />
              </TouchableOpacity> 
            </View>

            {/* TAB SECTION */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
              <View style={styles.tabContainer}>
                <TouchableOpacity style={[styles.tabBtn, activeTab === 'local' && styles.tabBtnActive]} onPress={() => setActiveTab('local')}>
                  <Text style={[styles.tabBtnText, activeTab === 'local' && styles.tabBtnTextActive]}>Local Workers</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabBtn, activeTab === 'pro' && styles.tabBtnActive]} onPress={() => setActiveTab('pro')}>
                  <Text style={[styles.tabBtnText, activeTab === 'pro' && styles.tabBtnTextActive]}>Professional Services</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabBtn, activeTab === 'shops' && styles.tabBtnActive]} onPress={() => setActiveTab('shops')}>
                  <Text style={[styles.tabBtnText, activeTab === 'shops' && styles.tabBtnTextActive]}>Shops</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>

        {/* 2. SERVICES SECTION */}
        <View style={styles.contentArea}>
          {filteredCategories.map(category => (
            <View key={category.id} style={styles.section}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryTitle}>{category.name}</Text>
              </View>

              <View style={styles.carouselWrapper}>
                <TouchableOpacity style={[styles.navArrow, styles.leftArrow]} activeOpacity={0.8} onPress={() => scrollByOffset(category.id, 'left')}>
                  <ChevronLeft size={20} color="#333" />
                </TouchableOpacity>

                <ScrollView
                  ref={(ref) => { scrollRefs.current[category.id] = ref; }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.serviceScrollContent}
                  snapToInterval={width * 0.44 + 15}
                  decelerationRate="fast"
                  scrollEventThrottle={16}
                >
                  {groupIntoVerticalPairs(category.services).map((pair, index) => (
                    <View key={index} style={styles.verticalColumn}>
                      {pair.map((service) => (
                        <TouchableOpacity
                          key={service.slug}
                          style={styles.serviceCard}
                          onPress={() => router.push({ pathname: '/service/[id]', params: { id: service.slug } } as any)}
                        >
                          <View style={styles.cardImageContainer}>
                            <Image 
                             source={{uri: service.image}} 
                             style={styles.cardImage} 
                             resizeMode="cover" 
                             cachePolicy="memory-disk"
                            //  onError={(e) => console.log('Image error:', e.nativeEvent)}
                             />
                          </View>
                          <View style={styles.cardTextContainer}>
                            <Text style={styles.cardName} numberOfLines={1}>{service.name}</Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ))}
                </ScrollView>

                <TouchableOpacity style={[styles.navArrow, styles.rightArrow]} activeOpacity={0.8} onPress={() => scrollByOffset(category.id, 'right')}>
                  <ChevronRight size={20} color="#333" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 3. SEARCH MODAL (SYNCHRONIZED WITH HOME PAGE) */}
      <Modal visible={isSearchVisible} animationType="slide" onRequestClose={() => setSearchVisible(false)}>
        <SafeAreaView style={styles.searchOverlay}>
          <View style={styles.searchHeaderCustom}>
            <TouchableOpacity onPress={() => setSearchVisible(false)}>
              <ArrowLeft size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.searchTitleCustom}>Search</Text>
          </View>

          <View style={styles.searchInputContainerCustom}>
            <Search size={22} color="#9CA3AF" style={{ marginRight: 10 }} />
            <TextInput
              placeholder="Find services, food, or places"
              style={styles.fullSearchInput}
              autoFocus={true}
              value={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                if (text.trim().length > 0) {
                  const filtered = allServicesList.filter(item => item.toLowerCase().includes(text.toLowerCase()));
                  setSearchSuggestions(filtered);
                } else {
                  setSearchSuggestions([]);
                }
              }}
              onSubmitEditing={() => handleSearchSubmit(searchQuery)}
            />
          </View>

          {/* SUGGESTIONS BOX */}
          {searchQuery.length > 0 && searchSuggestions.length > 0 && (
            <View style={styles.suggestionBox}>
              {searchSuggestions.slice(0, 5).map((item, index) => (
                <TouchableOpacity key={index} style={styles.suggestionItem} onPress={() => handleSearchSubmit(item)}>
                  <Search size={16} color="#9CA3AF" />
                  <Text style={styles.suggestionText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <ScrollView style={styles.searchScrollBody} showsVerticalScrollIndicator={false}>
            {searchQuery.length === 0 && searchHistory.length > 0 && (
              <>
                <Text style={styles.searchSectionTitle}>Recent history</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.historyChipsRow}>
                  {searchHistory.map((item, idx) => (
                    <View key={idx} style={styles.historyChip}>
                      <TouchableOpacity onPress={() => handleSearchSubmit(item)}>
                        <Text style={styles.chipText}>{item}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setSearchHistory(prev => prev.filter(h => h !== item))}>
                        <X size={14} color="#6B7280" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* 4. VOICE SEARCH MODAL */}
<Modal visible={voiceModalVisible} transparent={true} animationType="fade">
  <View style={styles.voiceOverlayBg}>
    <View style={styles.voiceContainer}>
      <TouchableOpacity 
        style={styles.closeVoice} 
        onPress={() => setVoiceModalVisible(false)}
      >
        <X size={24} color="#666" />
      </TouchableOpacity>
      
      <Text style={styles.voiceTitle}>Voice Search</Text>
      
      {voiceStep === 'listening' ? (
        <>
          <Text style={styles.voiceInstruction}>Tap the microphone to speak</Text>
          <View style={styles.voiceMicCircle}>
            <Mic size={40} color="#FFF" />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.voiceInstruction}>Search result:</Text>
          <View style={styles.voiceResultBox}>
            <Text style={styles.voiceResultText}>"Plumber"</Text>
          </View>
          <View style={styles.voiceActionRow}>
            <TouchableOpacity 
              style={styles.voiceTryAgain} 
              onPress={() => setVoiceStep('listening')}
            >
              <Text style={styles.tryAgainText}>Try Again</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.voiceSearchBtn} 
              onPress={() => { 
                setVoiceModalVisible(false); 
                // Triggers navigation + 7-item history tracking
                handleSearchSubmit('Plumber'); 
              }}
            >
              <Text style={styles.searchBtnText}>Search</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  </View>
</Modal>

    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  heroBg: { width: '100%', minHeight: 325, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  heroSafeArea: { flex: 1, paddingHorizontal: 8, paddingBottom: 10 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 },
  locationContainer: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  locationText: { color: '#FFF', fontSize: 16, fontWeight: '500' },
  heroText: { color: '#FFF', fontSize: 36, fontWeight: 'bold', marginTop: 25, lineHeight: 42 },
  heroSearchContainer: { flexDirection: 'row', marginTop: 25, gap: 12 },
  heroSearchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.25)', height: 50, borderRadius: 35, paddingHorizontal: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  heroMicBtn: { width: 52, height: 50, borderRadius: 32, backgroundColor: '#FF7A00', justifyContent: 'center', alignItems: 'center' },
  tabScroll: { marginTop: 20 },
  tabContainer: { flexDirection: 'row', gap: 5, paddingRight: 20 },
  tabBtn: { paddingHorizontal: 10, paddingVertical: 12, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  tabBtnActive: { backgroundColor: '#FF7A00', borderColor: '#FF7A00' },
  tabBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  tabBtnTextActive: { color: '#FFF' },
  contentArea: { paddingBottom: 80, marginTop: 10 },
  section: { marginTop: 25 },
  categoryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 15 },
  categoryTitle: { fontSize: 20, fontWeight: 'bold', color: '#111' },
  serviceScrollContent: { paddingLeft: 16 },
  verticalColumn: { flexDirection: 'column', marginRight: 15, gap: 15 ,paddingBottom: 5},
  serviceCard: { width: width * 0.43, backgroundColor: '#FFF', borderRadius: 20, borderWidth: 1, borderColor: '#F0F0F0', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, overflow: 'hidden' },
  cardImageContainer: { width: '100%', height: 155 },
  cardImage: { width: '100%', height: '100%' },
  cardTextContainer: { paddingVertical: 8, paddingHorizontal: 5 },
  cardName: { fontSize: 14, fontWeight: 'bold', color: '#111', textAlign: 'center' },
  carouselWrapper: { position: 'relative', flexDirection: 'row', alignItems: 'center' },
  navArrow: { position: 'absolute', zIndex: 10, width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', elevation: 5 },
  leftArrow: { left: 5, top: '45%' },
  rightArrow: { right: 5, top: '45%' },

  // --- NEW SEARCH MODAL STYLES ---
  searchOverlay: { flex: 1, backgroundColor: '#FFF' },
  searchHeaderCustom: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  searchTitleCustom: { fontSize: 22, fontWeight: 'bold', marginLeft: 12, color: '#1F2937' },
  searchInputContainerCustom: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', marginHorizontal: 16, borderRadius: 30, paddingHorizontal: 16, height: 52, marginBottom: 10 },
  fullSearchInput: { flex: 1, fontSize: 16, color: '#333' },
  searchScrollBody: { flex: 1, paddingHorizontal: 16 },
  searchSectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111', marginTop: 24, marginBottom: 15 },
  historyChipsRow: { paddingBottom: 5 },
  historyChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 25, marginRight: 10, marginBottom: 10, gap: 6 },
  chipText: { color: '#4B5563', fontSize: 14, fontWeight: '500' },
  suggestionBox: { backgroundColor: '#FFF', borderRadius: 12, marginHorizontal: 16, marginBottom: 10, borderWidth: 1, borderColor: '#E5E7EB', overflow: 'hidden' },
  suggestionItem: { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  suggestionText: { marginLeft: 10, fontSize: 16, color: '#1F2937' },


voiceOverlayBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  voiceContainer: { width: width * 0.85, backgroundColor: '#FFF', borderRadius: 25, padding: 24, alignItems: 'center' },
  closeVoice: { alignSelf: 'flex-end' },
  voiceTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  voiceInstruction: { fontSize: 16, color: '#666', marginBottom: 30 },
  voiceMicCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#FF7A00', justifyContent: 'center', alignItems: 'center', elevation: 5 },
  voiceResultBox: { backgroundColor: '#FFF7ED', padding: 20, borderRadius: 12, width: '100%', marginBottom: 30 },
  voiceResultText: { fontSize: 22, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  voiceActionRow: { flexDirection: 'row', gap: 15, width: '100%' },
  voiceTryAgain: { flex: 1, height: 50, borderRadius: 12, borderWidth: 1, borderColor: '#FF7A00', justifyContent: 'center', alignItems: 'center' },
  voiceSearchBtn: { flex: 1, height: 50, borderRadius: 12, backgroundColor: '#FF7A00', justifyContent: 'center', alignItems: 'center' },
  searchBtnText: { color: '#FFF', fontWeight: 'bold' },
  tryAgainText: { color: '#FF7A00', fontWeight: 'bold' },

});