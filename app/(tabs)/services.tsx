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
  Image,
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
      { name: 'Aquarium Cleaner', slug: 'aquarium-cleaner', image: require("../../assets/images/Services Images/Local Worker/1. Household Help & Cleaning/Aquarium-Cleaner.jpeg") },
      { name: 'Babysitter', slug: 'babysitter', image: require("../../assets/images/Services Images/Local Worker/1. Household Help & Cleaning/Babysitter.jpeg") },
      { name: 'Car Cleaner', slug: 'car-cleaner', image: require("../../assets/images/Services Images/Local Worker/1. Household Help & Cleaning/Car-Cleaner.jpeg") },
      { name: 'Cook Private Chef', slug: 'cook', image: require("../../assets/images/Services Images/Local Worker/1. Household Help & Cleaning/Cook-Private Chef.jpeg") },
      { name: 'Home Cleaning', slug: 'home-cleaning', image: require("../../assets/images/Services Images/Local Worker/1. Household Help & Cleaning/Home-Cleaning.jpeg") },
      { name: 'Home Nurse', slug: 'home-nurse', image: require("../../assets/images/Services Images/Local Worker/1. Household Help & Cleaning/Home-Nurse.jpeg") },
      { name: 'Iron Press', slug: 'iron-press', image: require("../../assets/images/Services Images/Local Worker/1. Household Help & Cleaning/Iron-Press.jpeg") },
      { name: 'Laundry Dry Cleaning', slug: 'laundry', image: require("../../assets/images/Services Images/Local Worker/1. Household Help & Cleaning/Laundry-Dry-Cleaning.jpeg") },
      { name: 'Maid', slug: 'maid', image: require("../../assets/images/Services Images/Local Worker/1. Household Help & Cleaning/Maid.jpeg") },
      { name: 'Toilet Cleaning', slug: 'toilet-cleaning', image: require("../../assets/images/Services Images/Local Worker/1. Household Help & Cleaning/Toilet-Cleaning.jpeg") },
      { name: 'Water Tank Cleaner', slug: 'water-tank', image: require("../../assets/images/Services Images/Local Worker/1. Household Help & Cleaning/Water-Tank-Cleaner.jpeg") },
    ],
  },
  {
    id: '2',
    name: 'Repair, Maintenance & Technical',
    services: [
      { name: 'AC Repair', slug: 'ac-repair', image: require("../../assets/images/Services Images/Local Worker/2. Repair, Maintenance & Technical/AC-Repair.jpeg") },
      { name: 'Carpenter', slug: 'carpenter', image: require("../../assets/images/Services Images/Local Worker/2. Repair, Maintenance & Technical/Carpenter.jpeg") },
      { name: 'Computer Laptop Technician', slug: 'comp-tech', image: require("../../assets/images/Services Images/Local Worker/2. Repair, Maintenance & Technical/Computer-Laptop-Technician.jpeg") },
      { name: 'Electrician', slug: 'electrician', image: require("../../assets/images/Services Images/Local Worker/2. Repair, Maintenance & Technical/Electrician.jpeg") },
      { name: 'Fan Tv Fridge Repair', slug: 'appliance-repair', image: require("../../assets/images/Services Images/Local Worker/2. Repair, Maintenance & Technical/Fan,Tv,Fridge-Repair.jpeg") },
      { name: 'Inverter Battery Technician', slug: 'inverter-tech', image: require("../../assets/images/Services Images/Local Worker/2. Repair, Maintenance & Technical/Inverter-Battery-Technician.jpeg") },
      { name: 'Key Maker', slug: 'key-maker', image: require("../../assets/images/Services Images/Local Worker/2. Repair, Maintenance & Technical/Key-Maker.jpeg") },
      { name: 'Mechanic', slug: 'mechanic', image: require("../../assets/images/Services Images/Local Worker/2. Repair, Maintenance & Technical/Mechanic.jpeg") },
      { name: 'Mobile Repair', slug: 'mobile-repair', image: require("../../assets/images/Services Images/Local Worker/2. Repair, Maintenance & Technical/Mobile-Repair.jpeg") },
      { name: 'Painter', slug: 'painter', image: require("../../assets/images/Services Images/Local Worker/2. Repair, Maintenance & Technical/Painter.jpeg") },
      { name: 'Plumber', slug: 'plumber', image: require("../../assets/images/Services Images/Local Worker/2. Repair, Maintenance & Technical/Plumber.jpeg") },
      { name: 'RO Water Purifier Service', slug: 'ro-service', image: require("../../assets/images/Services Images/Local Worker/2. Repair, Maintenance & Technical/RO-Water-Purifier-Service.jpeg") },
    ],
  },
  {
    id: '3',
    name: 'Construction & Labor Services',
    services: [
      { name: 'Coli', slug: 'coli', image: require("../../assets/images/Services Images/Local Worker/3. Construction & Labor Services/Coli.jpeg") },
      { name: 'Construction Labor', slug: 'labor', image: require("../../assets/images/Services Images/Local Worker/3. Construction & Labor Services/Construction-Labor.jpeg") },
      { name: 'Demolition Worker', slug: 'demolition', image: require("../../assets/images/Services Images/Local Worker/3. Construction & Labor Services/Demolition-Worker.jpeg") },
      { name: 'Driller (Wall Concrete)', slug: 'driller', image: require("../../assets/images/Services Images/Local Worker/3. Construction & Labor Services/Driller-(WallConcrete).jpeg") },
      { name: 'POP Worker', slug: 'pop-worker', image: require("../../assets/images/Services Images/Local Worker/3. Construction & Labor Services/POP-Worker.jpeg") },
      { name: 'Tiles & Marble Worker', slug: 'tiles-worker', image: require("../../assets/images/Services Images/Local Worker/3. Construction & Labor Services/Tiles-Marble-Worker.jpeg") },
      { name: 'Welder Fabrication Worker', slug: 'welder', image: require("../../assets/images/Services Images/Local Worker/3. Construction & Labor Services/Welder-Fabrication-Worker.jpeg") },
    ],
  },
  {
    id: '4',
    name: 'Gardening & Outdoor Services',
    services: [
      { name: 'Grass Cutter or Bush Trimmer', slug: 'grass-cutter', image: require("../../assets/images/Services Images/Local Worker/4. Gardening & Outdoor Services/Grass-Cutter-Bush-Trimmer.jpeg") },
      { name: 'Mali Gardener', slug: 'gardener', image: require("../../assets/images/Services Images/Local Worker/4. Gardening & Outdoor Services/Mali-Gardener.jpeg") },
      { name: 'Nursery Supplier', slug: 'nursery', image: require("../../assets/images/Services Images/Local Worker/4. Gardening & Outdoor Services/Nursery-Supplier.jpeg") },
      { name: 'Pest Control', slug: 'pest-control', image: require("../../assets/images/Services Images/Local Worker/4. Gardening & Outdoor Services/Pest-Control-Service.jpeg") },
    ],
  },
  {
    id: '5',
    name: 'Scrap & Utility (Pheri) Services',
    services: [
      { name: 'Glass and Bottle Buyer', slug: 'glass-buyer', image: require("../../assets/images/Services Images/Local Worker/5. Scrap & Utility(Pheri) Services/Glass-and-Bottle-Buyer.jpeg") },
      { name: 'Knife Sharpener', slug: 'knife-sharpener', image: require("../../assets/images/Services Images/Local Worker/5. Scrap & Utility(Pheri) Services/Knife-Sharpener.jpeg") },
      { name: 'Old Clothes Exchange', slug: 'clothes-exchange', image: require("../../assets/images/Services Images/Local Worker/5. Scrap & Utility(Pheri) Services/Old-Clothes-Exchange.jpeg") },
      { name: 'Raddi Dealer', slug: 'raddi-dealer', image: require("../../assets/images/Services Images/Local Worker/5. Scrap & Utility(Pheri) Services/Raddi-Dealer.jpeg") },
      { name: 'Scrap Dealer', slug: 'scrap-dealer', image: require("../../assets/images/Services Images/Local Worker/5. Scrap & Utility(Pheri) Services/Scrap-Dealer.jpeg") },
    ],
  },
  {
    id: '6',
    name: 'Religious & Community Services',
    services: [
      { name: 'Astrologer Palm Reader', slug: 'astrologer', image: require("../../assets/images/Services Images/Local Worker/6. Religious & Community Services/Astrologer-Palm-Reader.jpeg") },
      { name: 'Bhajan Kirtankar', slug: 'bhajan', image: require("../../assets/images/Services Images/Local Worker/6. Religious & Community Services/Bhajan-Kirtankar.jpeg") },
      { name: 'Crematorium Helper', slug: 'crematorium-helper', image: require("../../assets/images/Services Images/Local Worker/6. Religious & Community Services/Crematorium-Helper.jpeg") },
      { name: 'Pandit', slug: 'pandit', image: require("../../assets/images/Services Images/Local Worker/6. Religious & Community Services/Pandit.jpeg") },
      { name: 'Pujari', slug: 'pujari', image: require("../../assets/images/Services Images/Local Worker/6. Religious & Community Services/Pujari.jpeg") },
      { name: 'Vastu-Consultant', slug: 'vastu', image: require("../../assets/images/Services Images/Local Worker/6. Religious & Community Services/Vastu-Consultant.jpeg") },
    ],
  },
  {
    id: '7',
    name: 'Personal Care & Wellness',
    services: [
      { name: 'MakeUp', slug: 'makeup', image: require("../../assets/images/Services Images/Local Worker/7. Personal Care & Wellness/MakeUp.jpeg") },
      { name: 'Massage', slug: 'massage', image: require("../../assets/images/Services Images/Local Worker/7. Personal Care & Wellness/Massage.jpeg") },
      { name: 'Mehendi Artist', slug: 'mehendi', image: require("../../assets/images/Services Images/Local Worker/7. Personal Care & Wellness/Mehendi-Artist.jpeg") },
      { name: 'Tattoo Artist', slug: 'tattoo', image: require("../../assets/images/Services Images/Local Worker/7. Personal Care & Wellness/Tattoo-Artist.jpeg") },
    ],
  },
  {
    id: '8',
    name: 'Food & Beverage Vendors',
    services: [
      { name: 'Milk Vendor', slug: 'milk-vendor', image: require("../../assets/images/Services Images/Local Worker/8. Food & Beverage Vendors/Milk-Vendor.jpeg") },
      { name: 'Snacks Seller', slug: 'snacks-seller', image: require("../../assets/images/Services Images/Local Worker/8. Food & Beverage Vendors/Snacks-Seller.jpeg") },
      { name: 'Vegetable Seller', slug: 'veg-seller', image: require("../../assets/images/Services Images/Local Worker/8. Food & Beverage Vendors/Vegetable-Seller.jpeg") },
      { name: 'Catering & Tiffin Service', slug: 'tiffin', image: require("../../assets/images/Services Images/Local Worker/8. Food & Beverage Vendors/Catering-and-Tiffin-Service.jpeg") },
      { name: 'Coconut Water Seller', slug: 'coconut-water', image: require("../../assets/images/Services Images/Local Worker/8. Food & Beverage Vendors/Coconut-Water-Seller.jpeg") },
      { name: 'Egg Seller', slug: 'egg-seller', image: require("../../assets/images/Services Images/Local Worker/8. Food & Beverage Vendors/Egg-Seller.jpeg") },
      { name: 'Grains & Flour Mill', slug: 'flour-mill', image: require("../../assets/images/Services Images/Local Worker/8. Food & Beverage Vendors/Grains-and-Flour-Mill.jpeg") },
      { name: 'Meat Seller', slug: 'meat-seller', image: require("../../assets/images/Services Images/Local Worker/8. Food & Beverage Vendors/Meat-Seller.jpeg") },
    ],
  },
  {
    id: '9',
    name: 'Education & Knowledge Services',
    services: [
      { name: 'Book Seller', slug: 'book-seller', image: require("../../assets/images/Services Images/Local Worker/9. Education & Knowledge Services/Book-Seller.jpeg") },
      { name: 'Dance Teacher', slug: 'dance-teacher-local', image: require("../../assets/images/Services Images/Local Worker/9. Education & Knowledge Services/Dance-Teacher.jpeg") },
      { name: 'Home Tutor', slug: 'tutor-local', image: require("../../assets/images/Services Images/Local Worker/9. Education & Knowledge Services/Home Tutor.jpeg") },
      { name: 'Music Teacher', slug: 'music-teacher-local', image: require("../../assets/images/Services Images/Local Worker/9. Education & Knowledge Services/Music-Teacher.jpeg") },
      { name: 'Newspaper Services', slug: 'newspaper', image: require("../../assets/images/Services Images/Local Worker/9. Education & Knowledge Services/Newspaper-Services.jpeg") },
    ],
  },
  {
    id: '10',
    name: 'Clothing, Accessories & Tailoring',
    services: [
      { name: 'Button & Needle Seller', slug: 'button-seller', image: require("../../assets/images/Services Images/Local Worker/10. Clothing, Accessories & Tailoring/Button-and-Needle-Seller.jpeg") },
      { name: 'Clothes Seller', slug: 'clothes-seller-local', image: require("../../assets/images/Services Images/Local Worker/10. Clothing, Accessories & Tailoring/Clothes-Seller.jpeg") },
      { name: 'Jewellery Repair', slug: 'jewel-repair', image: require("../../assets/images/Services Images/Local Worker/10. Clothing, Accessories & Tailoring/Jewellery-Repair.jpeg") },
      { name: 'Spectacles Seller', slug: 'specs-seller', image: require("../../assets/images/Services Images/Local Worker/10. Clothing, Accessories & Tailoring/Spectacles-seller.jpeg") },
      { name: 'Tailor', slug: 'tailor', image: require("../../assets/images/Services Images/Local Worker/10. Clothing, Accessories & Tailoring/Tailor.jpeg") },
      { name: 'Watch Repairer', slug: 'watch-repair', image: require("../../assets/images/Services Images/Local Worker/10. Clothing, Accessories & Tailoring/Watch-Repairer.jpeg") },
      { name: 'Zari Worker', slug: 'zari-worker', image: require("../../assets/images/Services Images/Local Worker/10. Clothing, Accessories & Tailoring/Zari-Worker.jpeg") },
    ],
  },
  {
    id: '11',
    name: 'Event, Decoration & Creative Services',
    services: [
      { name: 'Designing Gifts', slug: 'gift-design', image: require("../../assets/images/Services Images/Local Worker/11. Event, Decoration & Creative Services/Designing-Gifts.jpeg") },
      { name: 'Event Decoration Supplier', slug: 'deco-supplier', image: require("../../assets/images/Services Images/Local Worker/11. Event, Decoration & Creative Services/Event Decoration Supplier.jpeg") },
      { name: 'Tent & Chair Supplier', slug: 'pandal', image: require("../../assets/images/Services Images/Local Worker/11. Event, Decoration & Creative Services/Tent-and-Chair-Supplier.jpeg") },
    ],
  },
  {
    id: '12',
    name: 'Traditional & Specialized Micro-Services',
    services: [
      { name: 'Bangle Seller', slug: 'bangle-seller', image: require("../../assets/images/Services Images/Local Worker/12. Traditional & Specialized Micro-Services/Bangle-Seller.jpeg") },
      { name: 'Basket Weaver', slug: 'basket-weaver', image: require("../../assets/images/Services Images/Local Worker/12. Traditional & Specialized Micro-Services/Basket-Weaver.jpeg") },
      { name: 'Chambhar (Cobbler)', slug: 'cobbler', image: require("../../assets/images/Services Images/Local Worker/12. Traditional & Specialized Micro-Services/Chambhar-(Cobbler).jpeg") },
      { name: 'Flower Seller', slug: 'flower-seller', image: require("../../assets/images/Services Images/Local Worker/12. Traditional & Specialized Micro-Services/Flower-Seller.jpeg") },
      { name: 'Potter (Matka Clay Items)', slug: 'potter', image: require("../../assets/images/Services Images/Local Worker/12. Traditional & Specialized Micro-Services/Potter-(MatkaClay-items).jpeg") },
      { name: 'Utensils Provider', slug: 'utensils', image: require("../../assets/images/Services Images/Local Worker/12. Traditional & Specialized Micro-Services/Utensils-Provider.jpeg") },
    ],
  },
  {
    id: '13',
    name: 'Driving & Transport Services',
    services: [
      { name: 'Ambulance Driver', slug: 'ambulance-driver', image: require("../../assets/images/Services Images/Local Worker/13. Driving & Transport Services/Ambulance-Driver.jpeg") },
      { name: 'Auto Driver', slug: 'auto-driver', image: require("../../assets/images/Services Images/Local Worker/13. Driving & Transport Services/Auto-Driver.jpeg") },
      { name: 'Bus Driver', slug: 'bus-driver', image: require("../../assets/images/Services Images/Local Worker/13. Driving & Transport Services/Bus-Driver.jpeg") },
      { name: 'Delivery Rider', slug: 'delivery-rider', image: require("../../assets/images/Services Images/Local Worker/13. Driving & Transport Services/Delivery-Rider.jpeg") },
      { name: 'JCB Crane Operator', slug: 'jcb-operator', image: require("../../assets/images/Services Images/Local Worker/13. Driving & Transport Services/JCB-Crane-Operator.jpeg") },
      { name: 'Private Chauffeur', slug: 'chauffeur', image: require("../../assets/images/Services Images/Local Worker/13. Driving & Transport Services/Private-Chauffeur.jpeg") },
      { name: 'Taxi Driver', slug: 'taxi-driver', image: require("../../assets/images/Services Images/Local Worker/13. Driving & Transport Services/Taxi-Driver.jpeg") },
      { name: 'Tempo & Mini Van Driver', slug: 'tempo-driver', image: require("../../assets/images/Services Images/Local Worker/13. Driving & Transport Services/Tempo-Mini-Van-Driver.jpeg") },
      { name: 'Tractor Driver', slug: 'tractor-driver', image: require("../../assets/images/Services Images/Local Worker/13. Driving & Transport Services/Tractor-Driver.jpeg") },
      { name: 'Truck Driver', slug: 'truck-driver', image: require("../../assets/images/Services Images/Local Worker/13. Driving & Transport Services/Truck-Driver.jpeg") },
    ],
  },
  {
    id: '14',
    name: 'Training and Teaching Services',
    services: [
      { name: 'Corporate Trainers', slug: 'corp-trainer', image: require("../../assets/images/Services Images/Local Worker/14. Training and Teaching Services/Corporate-Trainers.jpeg") },
      { name: 'Dance Teacher', slug: 'dance-train', image: require("../../assets/images/Services Images/Local Worker/14. Training and Teaching Services/Dance-Teacher.jpeg") },
      { name: 'Gym Trainer', slug: 'gym-train', image: require("../../assets/images/Services Images/Local Worker/14. Training and Teaching Services/Gym-Trainer.jpeg") },
      { name: 'Home Tutor', slug: 'tutor-train', image: require("../../assets/images/Services Images/Local Worker/14. Training and Teaching Services/Home Tutor.jpeg") },
      { name: 'Music Teacher', slug: 'music-train', image: require("../../assets/images/Services Images/Local Worker/14. Training and Teaching Services/Music-Teacher.jpeg") },
      { name: 'Sales Trainers', slug: 'sales-train', image: require("../../assets/images/Services Images/Local Worker/14. Training and Teaching Services/Sales-Trainers.jpeg") },
      { name: 'Yoga Trainer', slug: 'yoga-train', image: require("../../assets/images/Services Images/Local Worker/14. Training and Teaching Services/Yoga-Trainer.jpeg") },
    ],
  },

  // --- PROFESSIONAL SECTION (ID 15-17) ---
  {
    id: '15',
    name: 'Professional Profession',
    services: [
      { name: 'Accountant', slug: 'accountant', image: require("../../assets/images/Services Images/Professional Services/1. Professional Profession/Accountant.jpeg") },
      { name: 'Construction Builder', slug: 'builder', image: require("../../assets/images/Services Images/Professional Services/1. Professional Profession/Construction Builder.jpeg") },
      { name: 'Dentist', slug: 'dentist', image: require("../../assets/images/Services Images/Professional Services/1. Professional Profession/Dentist.jpeg") },
      { name: 'DJ Provider', slug: 'dj', image: require("../../assets/images/Services Images/Professional Services/1. Professional Profession/DJ-Provider.jpeg") },
      { name: 'Doctor', slug: 'doctor', image: require("../../assets/images/Services Images/Professional Services/1. Professional Profession/Doctor.jpeg") },
      { name: 'Gym', slug: 'gym-pro', image: require("../../assets/images/Services Images/Professional Services/1. Professional Profession/Gym.jpeg") },
      { name: 'Insurance Agent', slug: 'insurance', image: require("../../assets/images/Services Images/Professional Services/1. Professional Profession/Insurance-Agent.jpeg") },
      { name: 'Journalist/media', slug: 'journalist', image: require("../../assets/images/Services Images/Professional Services/1. Professional Profession/Journalist-media.jpeg") },
      { name: 'Lawer', slug: 'lawyer', image: require("../../assets/images/Services Images/Professional Services/1. Professional Profession/Lawer.jpeg") },
      { name: 'Nurse', slug: 'nurse-pro', image: require("../../assets/images/Services Images/Professional Services/1. Professional Profession/Nurse.jpeg") },
      { name: 'Photographer', slug: 'photographer', image: require("../../assets/images/Services Images/Professional Services/1. Professional Profession/Photographer.jpeg") },
      { name: 'Photography Studio', slug: 'photo-studio', image: require("../../assets/images/Services Images/Professional Services/1. Professional Profession/Photography-Studio.jpeg") },
      { name: 'Real Estate Agent', slug: 'real-estate', image: require("../../assets/images/Services Images/Professional Services/1. Professional Profession/Real-Estate-Agent.jpeg") },
      { name: 'Travel Agency', slug: 'travel-agency', image: require("../../assets/images/Services Images/Professional Services/1. Professional Profession/Travel-Agency.jpeg") },
      { name: 'Typist Document Writer', slug: 'typist', image: require("../../assets/images/Services Images/Professional Services/1. Professional Profession/Typist-Document-Writer.jpeg") },
    ],
  },
  {
    id: '16',
    name: 'Architecture & Designer Professionals',
    services: [
      { name: 'Architectural Design', slug: 'architect', image: require("../../assets/images/Services Images/Professional Services/2. Architecture & Designer Professionals/Architectural-Design.jpeg") },
      { name: 'Civil Contractor', slug: 'civil-contractor', image: require("../../assets/images/Services Images/Professional Services/2. Architecture & Designer Professionals/Civil-Contractor.jpeg") },
      { name: 'Interior Designers', slug: 'interior-designer', image: require("../../assets/images/Services Images/Professional Services/2. Architecture & Designer Professionals/Interior-Designers.jpeg") },
      { name: 'UX/UI Designer', slug: 'uiux-designer', image: require("../../assets/images/Services Images/Professional Services/2. Architecture & Designer Professionals/UX-UI-Designer.jpeg") },
    ],
  },
  {
    id: '17',
    name: 'Arts, Entertainment & Media',
    services: [
      { name: 'Actor', slug: 'actor', image: require("../../assets/images/Services Images/Professional Services/3. Arts, Entertainment & Media/Actor.jpeg") },
      { name: 'Actress', slug: 'actress', image: require("../../assets/images/Services Images/Professional Services/3. Arts, Entertainment & Media/Actress.jpeg") },
      { name: 'Choreographer', slug: 'choreographer', image: require("../../assets/images/Services Images/Professional Services/3. Arts, Entertainment & Media/Choreographer.jpeg") },
      { name: 'Dancer', slug: 'dancer-pro', image: require("../../assets/images/Services Images/Professional Services/3. Arts, Entertainment & Media/Dancer.jpeg") },
      { name: 'Musician', slug: 'musician-pro', image: require("../../assets/images/Services Images/Professional Services/3. Arts, Entertainment & Media/Musician.jpeg") },
      { name: 'Painter or Sketch Artist', slug: 'artist-pro', image: require("../../assets/images/Services Images/Professional Services/3. Arts, Entertainment & Media/Painter or Sketch Artist.jpeg") },
      { name: 'Singer', slug: 'singer-pro', image: require("../../assets/images/Services Images/Professional Services/3. Arts, Entertainment & Media/Singer.jpeg") },
      { name: 'Voiceover Artist', slug: 'voiceover', image: require("../../assets/images/Services Images/Professional Services/3. Arts, Entertainment & Media/Voiceover-Artist.jpeg") },
    ],
  },

  // --- SHOPS SECTION (ID 18-32) ---
  {
    id: '18',
    name: 'Home & Living',
    services: [
      { name: 'Home Decor Shop', slug: 'decor-shop', image: require("../../assets/images/Services Images/Shops/1. Home & Living/Home-Decor-Shop.jpeg") },
      { name: 'Mattress Store', slug: 'mattress-store', image: require("../../assets/images/Services Images/Shops/1. Home & Living/Mattress-Store.jpeg") },
      { name: 'Paint Shop', slug: 'paint-shop', image: require("../../assets/images/Services Images/Shops/1. Home & Living/Paint-Shop.jpeg") },
      { name: 'Plywood & Timber Shop', slug: 'plywood-shop', image: require("../../assets/images/Services Images/Shops/1. Home & Living/Plywood-and-Timber-Shop.jpeg") },
      { name: 'Curtain & Blinds Shop', slug: 'curtain-shop', image: require("../../assets/images/Services Images/Shops/1. Home & Living/Curtain-and-Blinds-Shop.jpeg") },
      { name: 'Furniture Shop', slug: 'furniture-shop', image: require("../../assets/images/Services Images/Shops/1. Home & Living/Furniture-Shop.jpeg") },
      { name: 'Glass & Aluminum Shop', slug: 'glass-shop', image: require("../../assets/images/Services Images/Shops/1. Home & Living/Glass-and-Aluminum-Shop.jpeg") },
    ],
  },
  {
    id: '19',
    name: 'Automobile & Transport',
    services: [
      { name: 'Battery Shop', slug: 'battery-shop', image: require("../../assets/images/Services Images/Shops/2. Automobile & Transport/Battery-Shop.jpeg") },
      { name: 'Bike Repair Shop', slug: 'bike-repair', image: require("../../assets/images/Services Images/Shops/2. Automobile & Transport/Bike-Repair-Shop.jpeg") },
      { name: 'Bike Showroom', slug: 'bike-showroom', image: require("../../assets/images/Services Images/Shops/2. Automobile & Transport/Bike-Showroom.jpeg") },
      { name: 'Bike Washing Center', slug: 'bike-wash', image: require("../../assets/images/Services Images/Shops/2. Automobile & Transport/Bike-Washing-Center.jpeg") },
      { name: 'Car Accessories Shop', slug: 'car-accessories', image: require("../../assets/images/Services Images/Shops/2. Automobile & Transport/Car-Accessories-Shop.jpeg") },
      { name: 'Car Service Center', slug: 'car-service', image: require("../../assets/images/Services Images/Shops/2. Automobile & Transport/Car-Service-Center.jpeg") },
      { name: 'Car Showroom', slug: 'car-showroom', image: require("../../assets/images/Services Images/Shops/2. Automobile & Transport/Car-Showroom.jpeg") },
      { name: 'Car Washing Center', slug: 'car-wash-shop', image: require("../../assets/images/Services Images/Shops/2. Automobile & Transport/Car-Washing-Center.jpeg") },
      { name: 'Tyre Shop', slug: 'tyre-shop', image: require("../../assets/images/Services Images/Shops/2. Automobile & Transport/Tyre-Shop.jpeg") },
      { name: 'Used Car Dealer', slug: 'used-car', image: require("../../assets/images/Services Images/Shops/2. Automobile & Transport/Used-Car-Dealer.jpeg") },
    ],
  },
  {
    id: '20',
    name: 'Food & Beverage',
    services: [
      { name: 'Bakery Shop', slug: 'bakery', image: require("../../assets/images/Services Images/Shops/3. Food & Beverage/Bakery-shop.jpeg") },
      { name: 'Cake Shop', slug: 'cake-shop', image: require("../../assets/images/Services Images/Shops/3. Food & Beverage/Cake-Shop.jpeg") },
      { name: 'Coffee Shop', slug: 'coffee-shop', image: require("../../assets/images/Services Images/Shops/3. Food & Beverage/Coffee-Shop.jpeg") },
      { name: 'Dhaba', slug: 'dhaba', image: require("../../assets/images/Services Images/Shops/3. Food & Beverage/Dhaba.jpeg") },
      { name: 'Fast Food Center', slug: 'fast-food', image: require("../../assets/images/Services Images/Shops/3. Food & Beverage/Fast-Food-Center.jpeg") },
      { name: 'Fruit Seller', slug: 'fruit-shop', image: require("../../assets/images/Services Images/Shops/3. Food & Beverage/Fruit-Seller.jpeg") },
      { name: 'Grain Seller', slug: 'grain-seller', image: require("../../assets/images/Services Images/Shops/3. Food & Beverage/Grain Seller.jpeg") },
      { name: 'Hotel Services', slug: 'hotel-shop', image: require("../../assets/images/Services Images/Shops/3. Food & Beverage/Hotel-Services.jpeg") },
      { name: 'Ice-Cream Seller', slug: 'ice-cream-shop', image: require("../../assets/images/Services Images/Shops/3. Food & Beverage/Ice-Cream-Seller.jpeg") },
      { name: 'Juice Seller', slug: 'juice-shop', image: require("../../assets/images/Services Images/Shops/3. Food & Beverage/Juice-Seller.jpeg") },
      { name: 'Restaurant Services', slug: 'restaurant', image: require("../../assets/images/Services Images/Shops/3. Food & Beverage/Restaurant-Services.jpeg") },
      { name: 'Sweet Seller (Halwai)', slug: 'sweet-shop', image: require("../../assets/images/Services Images/Shops/3. Food & Beverage/Sweet-Seller-(Halwai).jpeg") },
      { name: 'Tea Shop', slug: 'tea-shop', image: require("../../assets/images/Services Images/Shops/3. Food & Beverage/Tea-Shop.jpeg") },
    ],
  },
  {
    id: '21',
    name: 'Daily Needs & Retail',
    services: [
      { name: 'General Store', slug: 'general-store', image: require("../../assets/images/Services Images/Shops/4. Daily Needs & Retail/General-Store.jpeg") },
      { name: 'Grocery Shop', slug: 'grocery-shop', image: require("../../assets/images/Services Images/Shops/4. Daily Needs & Retail/Grocery-Shop.jpeg") },
      { name: 'Kirana Shop', slug: 'kirana-shop', image: require("../../assets/images/Services Images/Shops/4. Daily Needs & Retail/Kirana-Shop.jpeg") },
      { name: 'Supermarket', slug: 'supermarket', image: require("../../assets/images/Services Images/Shops/4. Daily Needs & Retail/Supermarket.jpeg") },
    ],
  },
  {
    id: '22',
    name: 'Fashion & Lifestyle',
    services: [
      { name: 'Fashion Accessories Shop', slug: 'fashion-shop', image: require("../../assets/images/Services Images/Shops/5. Fashion & Lifestyle/Fashion-Accessories-Shop.jpeg") },
      { name: 'Footwear Store', slug: 'footwear-store', image: require("../../assets/images/Services Images/Shops/5. Fashion & Lifestyle/Footwear-Store.jpeg") },
      { name: 'Hair Salon', slug: 'hair-salon-shop', image: require("../../assets/images/Services Images/Shops/5. Fashion & Lifestyle/Hair-Salon.jpeg") },
      { name: 'Kids Wear Shop', slug: 'kids-wear', image: require("../../assets/images/Services Images/Shops/5. Fashion & Lifestyle/Kids-Wear-Shop.jpeg") },
      { name: "Men's Wear Shop", slug: 'mens-wear', image: require("../../assets/images/Services Images/Shops/5. Fashion & Lifestyle/Men's-Wear-Shop.jpeg") },
      { name: 'Saree Shop', slug: 'saree-shop', image: require("../../assets/images/Services Images/Shops/5. Fashion & Lifestyle/Saree-Shop.jpeg") },
      { name: "Women's Wear Shop", slug: 'womens-wear', image: require("../../assets/images/Services Images/Shops/5. Fashion & Lifestyle/Women's-Wear-Shop.jpeg") },
    ],
  },
  {
    id: '23',
    name: 'Jewelry & Luxury',
    services: [
      { name: 'Diamond Jewelry Store', slug: 'diamond-shop', image: require("../../assets/images/Services Images/Shops/6. Jewelry & Luxury/Diamond-Jewelry-Store.jpeg") },
      { name: 'Gold & Silver Shop', slug: 'gold-shop', image: require("../../assets/images/Services Images/Shops/6. Jewelry & Luxury/Gold-and-Silver-Shop.jpeg") },
      { name: 'Jewelry Shop', slug: 'jewelry-shop', image: require("../../assets/images/Services Images/Shops/6. Jewelry & Luxury/Jewelry-Shop.jpeg") },
      { name: 'Watch Store', slug: 'watch-store', image: require("../../assets/images/Services Images/Shops/6. Jewelry & Luxury/Watch-Store.jpeg") },
    ],
  },
  {
    id: '24',
    name: 'Beauty & Wellness',
    services: [
      { name: 'Beauty Parlor', slug: 'beauty-parlor', image: require("../../assets/images/Services Images/Shops/7. Beauty & Wellness/Beauty-Parlor.jpeg") },
      { name: 'Cosmetic Store', slug: 'cosmetic-shop', image: require("../../assets/images/Services Images/Shops/7. Beauty & Wellness/Cosmetic-Store.jpeg") },
      { name: 'Fitness Studio', slug: 'fitness-studio', image: require("../../assets/images/Services Images/Shops/7. Beauty & Wellness/Fitness-Studio.jpeg") },
      { name: 'Salon', slug: 'salon-shop', image: require("../../assets/images/Services Images/Shops/7. Beauty & Wellness/Salon.jpeg") },
      { name: 'Spa & Massage Center', slug: 'spa-center', image: require("../../assets/images/Services Images/Shops/7. Beauty & Wellness/Spa-and-Massage-Center.jpeg") },
      { name: 'Yoga', slug: 'yoga-studio', image: require("../../assets/images/Services Images/Shops/7. Beauty & Wellness/Yoga.jpeg") },
    ],
  },
  {
    id: '25',
    name: 'Health & Medical',
    services: [
      { name: 'Clinic', slug: 'clinic-shop', image: require("../../assets/images/Services Images/Shops/8. Health & Medical/Clinic.jpeg") },
      { name: 'Dental-Clinic', slug: 'dental-shop', image: require("../../assets/images/Services Images/Shops/8. Health & Medical/Dental-Clinic.jpeg") },
      { name: 'Medical-Store', slug: 'medical-store', image: require("../../assets/images/Services Images/Shops/8. Health & Medical/Medical-Store.jpeg") },
      { name: 'Pharmacy', slug: 'pharmacy-shop', image: require("../../assets/images/Services Images/Shops/8. Health & Medical/Pharmacy.jpeg") },
    ],
  },
  {
    id: '26',
    name: 'Services & Repairs',
    services: [
      { name: 'AC Repair', slug: 'ac-repair-shop', image: require("../../assets/images/Services Images/Shops/9. Services & Repairs/AC-Repair.jpeg") },
      { name: 'Carpenter', slug: 'carpenter-shop', image: require("../../assets/images/Services Images/Shops/9. Services & Repairs/Carpenter.jpeg") },
      { name: 'Computer & Laptop Technician', slug: 'comp-tech-shop', image: require("../../assets/images/Services Images/Shops/9. Services & Repairs/Computer-Laptop-Technician.jpeg") },
      { name: 'Electrician', slug: 'electrician-shop', image: require("../../assets/images/Services Images/Shops/9. Services & Repairs/Electrician.jpeg") },
      { name: 'Fan Tv Fridge-Repair', slug: 'appliance-shop', image: require("../../assets/images/Services Images/Shops/9. Services & Repairs/Fan,Tv,Fridge-Repair.jpeg") },
      { name: 'Inverter & Battery Technician', slug: 'inverter-shop', image: require("../../assets/images/Services Images/Shops/9. Services & Repairs/Inverter-and-Battery-Technician.jpeg") },
      { name: 'Mechanic', slug: 'mechanic-shop', image: require("../../assets/images/Services Images/Shops/9. Services & Repairs/Mechanic.jpeg") },
      { name: 'Mobile Repair', slug: 'mobile-repair-shop', image: require("../../assets/images/Services Images/Shops/9. Services & Repairs/Mobile-Repair.jpeg") },
      { name: 'Plumber', slug: 'plumber-shop', image: require("../../assets/images/Services Images/Shops/9. Services & Repairs/Plumber.jpeg") },
      { name: 'RO Water Purifier Service', slug: 'ro-shop', image: require("../../assets/images/Services Images/Shops/9. Services & Repairs/RO-Water-Purifier-Service.jpeg") },
    ],
  },
  {
    id: '27',
    name: 'Electronics & Appliances',
    services: [
      { name: 'CCTV & Security Shop', slug: 'cctv-shop', image: require("../../assets/images/Services Images/Shops/10. Electronics & Appliances/CCTV-and-Security-Shop.jpeg") },
      { name: 'Computer Shop', slug: 'computer-shop', image: require("../../assets/images/Services Images/Shops/10. Electronics & Appliances/Computer-Shop.jpeg") },
      { name: 'Electronics Shop', slug: 'electronics-shop', image: require("../../assets/images/Services Images/Shops/10. Electronics & Appliances/Electronics-Shop.jpeg") },
      { name: 'Home Appliances Store', slug: 'appliance-store', image: require("../../assets/images/Services Images/Shops/10. Electronics & Appliances/Home-Appliances-Store.jpeg") },
      { name: 'Mobile Store', slug: 'mobile-store', image: require("../../assets/images/Services Images/Shops/10. Electronics & Appliances/Mobile-Store.jpeg") },
      { name: 'Printer & Accessories Store', slug: 'printer-shop', image: require("../../assets/images/Services Images/Shops/10. Electronics & Appliances/Printer-and-Accessories-Store.jpeg") },
    ],
  },
  {
    id: '28',
    name: 'Education & Offices',
    services: [
      { name: 'Book Store', slug: 'book-store', image: require("../../assets/images/Services Images/Shops/11. Education & Knowledge Services/Book-Store.jpeg") },
      { name: 'Coaching Classes', slug: 'coaching', image: require("../../assets/images/Services Images/Shops/11. Education & Knowledge Services/Coaching-Classes.jpeg") },
      { name: 'Computer Training Institute', slug: 'comp-inst', image: require("../../assets/images/Services Images/Shops/11. Education & Knowledge Services/Computer-Training-Institute.jpeg") },
      { name: 'Printing & Xerox Shop', slug: 'xerox-shop', image: require("../../assets/images/Services Images/Shops/11. Education & Knowledge Services/Printing-and-Xerox-Shop.jpeg") },
      { name: 'Stationary Shop', slug: 'stationary-shop', image: require("../../assets/images/Services Images/Shops/11. Education & Knowledge Services/Stationary-Shop.jpeg") },
    ],
  },
  {
    id: '29',
    name: 'Construction & Industrial',
    services: [
      { name: 'Building Material Supplier Shop', slug: 'building-mat', image: require("../../assets/images/Services Images/Shops/12. Construction & Industrial/Building-Material-Supplier-shop.jpeg") },
      { name: 'Cement', slug: 'cement-shop', image: require("../../assets/images/Services Images/Shops/12. Construction & Industrial/Cement.jpeg") },
      { name: 'Electrical Materials', slug: 'electrical-mat', image: require("../../assets/images/Services Images/Shops/12. Construction & Industrial/Electrical-Materials.jpeg") },
      { name: 'Fabrication', slug: 'fab-shop', image: require("../../assets/images/Services Images/Shops/12. Construction & Industrial/Fabrication.jpeg") },
      { name: 'Sanitaryware', slug: 'sanitary-shop', image: require("../../assets/images/Services Images/Shops/12. Construction & Industrial/Sanitaryware.jpeg") },
      { name: 'Welding Works', slug: 'welding-shop', image: require("../../assets/images/Services Images/Shops/12. Construction & Industrial/Welding-Works.jpeg") },
    ],
  },
  {
    id: '30',
    name: 'Pets & Animals',
    services: [
      { name: 'Aquarium', slug: 'aquarium-shop', image: require("../../assets/images/Services Images/Shops/13. Pets & Animals/Aquarium.jpeg") },
      { name: 'Pet Birds Shop', slug: 'bird-shop', image: require("../../assets/images/Services Images/Shops/13. Pets & Animals/Pet-Birds-Shop.jpeg") },
      { name: 'Pet Dogs Shop', slug: 'dog-shop', image: require("../../assets/images/Services Images/Shops/13. Pets & Animals/Pet-Dogs-Shop.jpeg") },
      { name: 'Pet Food', slug: 'pet-food-shop', image: require("../../assets/images/Services Images/Shops/13. Pets & Animals/Pet-Food.jpeg") },
    ],
  },
  {
    id: '31',
    name: 'Events & Miscellaneous',
    services: [
      { name: 'Event Organizer', slug: 'event-org', image: require("../../assets/images/Services Images/Shops/14. Events & Miscellaneous/Event-Organizer.jpeg") },
      { name: 'Gift Shop', slug: 'gift-shop', image: require("../../assets/images/Services Images/Shops/14. Events & Miscellaneous/Gift-Shop.jpeg") },
      { name: 'Marriage Hall Organizer', slug: 'marriage-hall', image: require("../../assets/images/Services Images/Shops/14. Events & Miscellaneous/Marriage-Hall-Organizer.jpeg") },
    ],
  },
  {
    id: '32',
    name: 'Hardware & Tools Shops',
    services: [
      { name: 'Carpentry Tools Shop', slug: 'carpentry-tools', image: require("../../assets/images/Services Images/Shops/15. Hardware & Tools Shops/Carpentry-Tools-Shop.jpeg") },
      { name: 'Hardware Parts Shop', slug: 'hardware-shop', image: require("../../assets/images/Services Images/Shops/15. Hardware & Tools Shops/Hardware-Parts-Shop.jpeg") },
      { name: 'Plumbing Equipment Shop', slug: 'plumbing-equip', image: require("../../assets/images/Services Images/Shops/15. Hardware & Tools Shops/Plumbing-Equipment-Shop.jpeg") },
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
                            <Image source={service.image} style={styles.cardImage} resizeMode="cover" />
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

//  voiceOverlay: {
//   flex: 1,
//   backgroundColor: 'rgba(0,0,0,0.6)',
//   justifyContent: 'center',
//   alignItems: 'center',
// },
// voiceModal: {
//   width: '80%',
//   backgroundColor: '#FFF',
//   borderRadius: 16,
//   padding: 30,
//   alignItems: 'center',
// },
// voiceClose: {
//   position: 'absolute',
//   top: 12,
//   right: 12,
// },
// voiceTitle: {
//   marginTop: 16,
//   fontSize: 20,
//   fontWeight: '700',
//   color: '#111',
// },
// voiceSub: {
//   marginTop: 6,
//   fontSize: 14,
//   color: '#6B7280',
//   textAlign: 'center',
// },
// voiceResultBtn: {
//   marginTop: 20,
//   backgroundColor: '#10B981',
//   paddingHorizontal: 20,
//   paddingVertical: 10,
//   borderRadius: 10,
// },

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