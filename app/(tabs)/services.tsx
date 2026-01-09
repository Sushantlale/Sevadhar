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
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

// Carousel Dimensions: Each vertical pair block takes up ~44% of screen width
const ITEM_WIDTH = width * 0.44;

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
      { name: 'Aquarium-Cleaner', slug: 'aquarium-cleaner', image: require("../../assets/images/Services Images/Local Worker/1. Household Help & Cleaning/Aquarium-Cleaner.jpeg") },
      { name: 'Babysitter', slug: 'babysitter', image: require("../../assets/images/Services Images/Local Worker/1. Household Help & Cleaning/Babysitter.jpeg") },
      { name: 'Car-Cleaner', slug: 'car-cleaner', image: require("../../assets/images/Services Images/Local Worker/1. Household Help & Cleaning/Car-Cleaner.jpeg") },
      { name: 'Cook-Private Chef', slug: 'cook', image: require("../../assets/images/Services Images/Local Worker/1. Household Help & Cleaning/Cook-Private Chef.jpeg") },
      { name: 'Home-Cleaning', slug: 'home-cleaning', image: require("../../assets/images/Services Images/Local Worker/1. Household Help & Cleaning/Home-Cleaning.jpeg") },
      { name: 'Home-Nurse', slug: 'home-nurse', image: require("../../assets/images/Services Images/Local Worker/1. Household Help & Cleaning/Home-Nurse.jpeg") },
      { name: 'Iron-Press', slug: 'iron-press', image: require("../../assets/images/Services Images/Local Worker/1. Household Help & Cleaning/Iron-Press.jpeg") },
      { name: 'Laundry-Dry-Cleaning', slug: 'laundry', image: require("../../assets/images/Services Images/Local Worker/1. Household Help & Cleaning/Laundry-Dry-Cleaning.jpeg") },
      { name: 'Maid', slug: 'maid', image: require("../../assets/images/Services Images/Local Worker/1. Household Help & Cleaning/Maid.jpeg") },
      { name: 'Toilet-Cleaning', slug: 'toilet-cleaning', image: require("../../assets/images/Services Images/Local Worker/1. Household Help & Cleaning/Toilet-Cleaning.jpeg") },
      { name: 'Water-Tank-Cleaner', slug: 'water-tank', image: require("../../assets/images/Services Images/Local Worker/1. Household Help & Cleaning/Water-Tank-Cleaner.jpeg") },
    ],
  },
  {
    id: '2',
    name: 'Repair, Maintenance & Technical',
    services: [
      { name: 'AC-Repair', slug: 'ac-repair', image: require("../../assets/images/Services Images/Local Worker/2. Repair, Maintenance & Technical/AC-Repair.jpeg") },
      { name: 'Carpenter', slug: 'carpenter', image: require("../../assets/images/Services Images/Local Worker/2. Repair, Maintenance & Technical/Carpenter.jpeg") },
      { name: 'Computer-Laptop-Technician', slug: 'comp-tech', image: require("../../assets/images/Services Images/Local Worker/2. Repair, Maintenance & Technical/Computer-Laptop-Technician.jpeg") },
      { name: 'Electrician', slug: 'electrician', image: require("../../assets/images/Services Images/Local Worker/2. Repair, Maintenance & Technical/Electrician.jpeg") },
      { name: 'Fan,Tv,Fridge-Repair', slug: 'appliance-repair', image: require("../../assets/images/Services Images/Local Worker/2. Repair, Maintenance & Technical/Fan,Tv,Fridge-Repair.jpeg") },
      { name: 'Inverter-&-Battery-Technician', slug: 'inverter-tech', image: require("../../assets/images/Services Images/Local Worker/2. Repair, Maintenance & Technical/Inverter-Battery-Technician.jpeg") },
      { name: 'Key-Maker', slug: 'key-maker', image: require("../../assets/images/Services Images/Local Worker/2. Repair, Maintenance & Technical/Key-Maker.jpeg") },
      { name: 'Mechanic', slug: 'mechanic', image: require("../../assets/images/Services Images/Local Worker/2. Repair, Maintenance & Technical/Mechanic.jpeg") },
      { name: 'Mobile-Repair', slug: 'mobile-repair', image: require("../../assets/images/Services Images/Local Worker/2. Repair, Maintenance & Technical/Mobile-Repair.jpeg") },
      { name: 'Painter', slug: 'painter', image: require("../../assets/images/Services Images/Local Worker/2. Repair, Maintenance & Technical/Painter.jpeg") },
      { name: 'Plumber', slug: 'plumber', image: require("../../assets/images/Services Images/Local Worker/2. Repair, Maintenance & Technical/Plumber.jpeg") },
      { name: 'RO-Water-Purifier-Service', slug: 'ro-service', image: require("../../assets/images/Services Images/Local Worker/2. Repair, Maintenance & Technical/RO-Water-Purifier-Service.jpeg") },
    ],
  },
  {
    id: '3',
    name: 'Construction & Labor Services',
    services: [
      { name: 'Coli', slug: 'coli', image: require("../../assets/images/Services Images/Local Worker/3. Construction & Labor Services/Coli.jpeg") },
      { name: 'Construction-Labor', slug: 'labor', image: require("../../assets/images/Services Images/Local Worker/3. Construction & Labor Services/Construction-Labor.jpeg") },
      { name: 'Demolition-Worker', slug: 'demolition', image: require("../../assets/images/Services Images/Local Worker/3. Construction & Labor Services/Demolition-Worker.jpeg") },
      { name: 'Driller-(WallConcrete)', slug: 'driller', image: require("../../assets/images/Services Images/Local Worker/3. Construction & Labor Services/Driller-(WallConcrete).jpeg") },
      { name: 'POP-Worker', slug: 'pop-worker', image: require("../../assets/images/Services Images/Local Worker/3. Construction & Labor Services/POP-Worker.jpeg") },
      { name: 'Tiles-&-Marble-Worker', slug: 'tiles-worker', image: require("../../assets/images/Services Images/Local Worker/3. Construction & Labor Services/Tiles-Marble-Worker.jpeg") },
      { name: 'Welder-Fabrication-Worker', slug: 'welder', image: require("../../assets/images/Services Images/Local Worker/3. Construction & Labor Services/Welder-Fabrication-Worker.jpeg") },
    ],
  },
  {
    id: '4',
    name: 'Gardening & Outdoor Services',
    services: [
      { name: 'Grass-Cutter-Bush-Trimmer', slug: 'grass-cutter', image: require("../../assets/images/Services Images/Local Worker/4. Gardening & Outdoor Services/Grass-Cutter-Bush-Trimmer.jpeg") },
      { name: 'Mali-Gardener', slug: 'gardener', image: require("../../assets/images/Services Images/Local Worker/4. Gardening & Outdoor Services/Mali-Gardener.jpeg") },
      { name: 'Nursery-Supplier', slug: 'nursery', image: require("../../assets/images/Services Images/Local Worker/4. Gardening & Outdoor Services/Nursery-Supplier.jpeg") },
      { name: 'Pest-Control-Service', slug: 'pest-control', image: require("../../assets/images/Services Images/Local Worker/4. Gardening & Outdoor Services/Pest-Control-Service.jpeg") },
    ],
  },
  {
    id: '5',
    name: 'Scrap & Utility (Pheri) Services',
    services: [
      { name: 'Glass-and-Bottle-Buyer', slug: 'glass-buyer', image: require("../../assets/images/Services Images/Local Worker/5. Scrap & Utility(Pheri) Services/Glass-and-Bottle-Buyer.jpeg") },
      { name: 'Knife-Sharpener', slug: 'knife-sharpener', image: require("../../assets/images/Services Images/Local Worker/5. Scrap & Utility(Pheri) Services/Knife-Sharpener.jpeg") },
      { name: 'Old-Clothes-Exchange', slug: 'clothes-exchange', image: require("../../assets/images/Services Images/Local Worker/5. Scrap & Utility(Pheri) Services/Old-Clothes-Exchange.jpeg") },
      { name: 'Raddi-Dealer', slug: 'raddi-dealer', image: require("../../assets/images/Services Images/Local Worker/5. Scrap & Utility(Pheri) Services/Raddi-Dealer.jpeg") },
      { name: 'Scrap-Dealer', slug: 'scrap-dealer', image: require("../../assets/images/Services Images/Local Worker/5. Scrap & Utility(Pheri) Services/Scrap-Dealer.jpeg") },
    ],
  },
  {
    id: '6',
    name: 'Religious & Community Services',
    services: [
      { name: 'Astrologer-Palm-Reader', slug: 'astrologer', image: require("../../assets/images/Services Images/Local Worker/6. Religious & Community Services/Astrologer-Palm-Reader.jpeg") },
      { name: 'Bhajan-Kirtankar', slug: 'bhajan', image: require("../../assets/images/Services Images/Local Worker/6. Religious & Community Services/Bhajan-Kirtankar.jpeg") },
      { name: 'Crematorium-Helper', slug: 'crematorium-helper', image: require("../../assets/images/Services Images/Local Worker/6. Religious & Community Services/Crematorium-Helper.jpeg") },
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
      { name: 'Mehendi-Artist', slug: 'mehendi', image: require("../../assets/images/Services Images/Local Worker/7. Personal Care & Wellness/Mehendi-Artist.jpeg") },
      { name: 'Tattoo-Artist', slug: 'tattoo', image: require("../../assets/images/Services Images/Local Worker/7. Personal Care & Wellness/Tattoo-Artist.jpeg") },
    ],
  },
  {
    id: '8',
    name: 'Food & Beverage Vendors',
    services: [
      { name: 'Milk-Vendor', slug: 'milk-vendor', image: require("../../assets/images/Services Images/Local Worker/8. Food & Beverage Vendors/Milk-Vendor.jpeg") },
      { name: 'Snacks-Seller', slug: 'snacks-seller', image: require("../../assets/images/Services Images/Local Worker/8. Food & Beverage Vendors/Snacks-Seller.jpeg") },
      { name: 'Vegetable-Seller', slug: 'veg-seller', image: require("../../assets/images/Services Images/Local Worker/8. Food & Beverage Vendors/Vegetable-Seller.jpeg") },
      { name: 'Catering-&-Tiffin-Service', slug: 'tiffin', image: require("../../assets/images/Services Images/Local Worker/8. Food & Beverage Vendors/Catering-and-Tiffin-Service.jpeg") },
      { name: 'Coconut-Water-Seller', slug: 'coconut-water', image: require("../../assets/images/Services Images/Local Worker/8. Food & Beverage Vendors/Coconut-Water-Seller.jpeg") },
      { name: 'Egg-Seller', slug: 'egg-seller', image: require("../../assets/images/Services Images/Local Worker/8. Food & Beverage Vendors/Egg-Seller.jpeg") },
      { name: 'Grains-&-Flour-Mill', slug: 'flour-mill', image: require("../../assets/images/Services Images/Local Worker/8. Food & Beverage Vendors/Grains-and-Flour-Mill.jpeg") },
      { name: 'Meat-Seller', slug: 'meat-seller', image: require("../../assets/images/Services Images/Local Worker/8. Food & Beverage Vendors/Meat-Seller.jpeg") },
    ],
  },
  {
    id: '9',
    name: 'Education & Knowledge Services',
    services: [
      { name: 'Book-Seller', slug: 'book-seller', image: require("../../assets/images/Services Images/Local Worker/9. Education & Knowledge Services/Book-Seller.jpeg") },
      { name: 'Dance-Teacher', slug: 'dance-teacher-local', image: require("../../assets/images/Services Images/Local Worker/9. Education & Knowledge Services/Dance-Teacher.jpeg") },
      { name: 'Home Tutor', slug: 'tutor-local', image: require("../../assets/images/Services Images/Local Worker/9. Education & Knowledge Services/Home Tutor.jpeg") },
      { name: 'Music-Teacher', slug: 'music-teacher-local', image: require("../../assets/images/Services Images/Local Worker/9. Education & Knowledge Services/Music-Teacher.jpeg") },
      { name: 'Newspaper-Services', slug: 'newspaper', image: require("../../assets/images/Services Images/Local Worker/9. Education & Knowledge Services/Newspaper-Services.jpeg") },
    ],
  },
  {
    id: '10',
    name: 'Clothing, Accessories & Tailoring',
    services: [
      { name: 'Button-&-Needle-Seller', slug: 'button-seller', image: require("../../assets/images/Services Images/Local Worker/10. Clothing, Accessories & Tailoring/Button-and-Needle-Seller.jpeg") },
      { name: 'Clothes-Seller', slug: 'clothes-seller-local', image: require("../../assets/images/Services Images/Local Worker/10. Clothing, Accessories & Tailoring/Clothes-Seller.jpeg") },
      { name: 'Jewellery-Repair', slug: 'jewel-repair', image: require("../../assets/images/Services Images/Local Worker/10. Clothing, Accessories & Tailoring/Jewellery-Repair.jpeg") },
      { name: 'Spectacles-seller', slug: 'specs-seller', image: require("../../assets/images/Services Images/Local Worker/10. Clothing, Accessories & Tailoring/Spectacles-seller.jpeg") },
      { name: 'Tailor', slug: 'tailor', image: require("../../assets/images/Services Images/Local Worker/10. Clothing, Accessories & Tailoring/Tailor.jpeg") },
      { name: 'Watch-Repairer', slug: 'watch-repair', image: require("../../assets/images/Services Images/Local Worker/10. Clothing, Accessories & Tailoring/Watch-Repairer.jpeg") },
      { name: 'Zari-Worker', slug: 'zari-worker', image: require("../../assets/images/Services Images/Local Worker/10. Clothing, Accessories & Tailoring/Zari-Worker.jpeg") },
    ],
  },
  {
    id: '11',
    name: 'Event, Decoration & Creative Services',
    services: [
      { name: 'Designing-Gifts', slug: 'gift-design', image: require("../../assets/images/Services Images/Local Worker/11. Event, Decoration & Creative Services/Designing-Gifts.jpeg") },
      { name: 'Event Decoration Supplier', slug: 'deco-supplier', image: require("../../assets/images/Services Images/Local Worker/11. Event, Decoration & Creative Services/Event Decoration Supplier.jpeg") },
      { name: 'Tent-&-Chair-Supplier', slug: 'pandal', image: require("../../assets/images/Services Images/Local Worker/11. Event, Decoration & Creative Services/Tent-and-Chair-Supplier.jpeg") },
    ],
  },
  {
    id: '12',
    name: 'Traditional & Specialized Micro-Services',
    services: [
      { name: 'Bangle-Seller', slug: 'bangle-seller', image: require("../../assets/images/Services Images/Local Worker/12. Traditional & Specialized Micro-Services/Bangle-Seller.jpeg") },
      { name: 'Basket-Weaver', slug: 'basket-weaver', image: require("../../assets/images/Services Images/Local Worker/12. Traditional & Specialized Micro-Services/Basket-Weaver.jpeg") },
      { name: 'Chambhar-(Cobbler)', slug: 'cobbler', image: require("../../assets/images/Services Images/Local Worker/12. Traditional & Specialized Micro-Services/Chambhar-(Cobbler).jpeg") },
      { name: 'Flower-Seller', slug: 'flower-seller', image: require("../../assets/images/Services Images/Local Worker/12. Traditional & Specialized Micro-Services/Flower-Seller.jpeg") },
      { name: 'Potter-(MatkaClay-items)', slug: 'potter', image: require("../../assets/images/Services Images/Local Worker/12. Traditional & Specialized Micro-Services/Potter-(MatkaClay-items).jpeg") },
      { name: 'Utensils-Provider', slug: 'utensils', image: require("../../assets/images/Services Images/Local Worker/12. Traditional & Specialized Micro-Services/Utensils-Provider.jpeg") },
    ],
  },
  {
    id: '13',
    name: 'Driving & Transport Services',
    services: [
      { name: 'Ambulance-Driver', slug: 'ambulance-driver', image: require("../../assets/images/Services Images/Local Worker/13. Driving & Transport Services/Ambulance-Driver.jpeg") },
      { name: 'Auto-Driver', slug: 'auto-driver', image: require("../../assets/images/Services Images/Local Worker/13. Driving & Transport Services/Auto-Driver.jpeg") },
      { name: 'Bus-Driver', slug: 'bus-driver', image: require("../../assets/images/Services Images/Local Worker/13. Driving & Transport Services/Bus-Driver.jpeg") },
      { name: 'Delivery-Rider', slug: 'delivery-rider', image: require("../../assets/images/Services Images/Local Worker/13. Driving & Transport Services/Delivery-Rider.jpeg") },
      { name: 'JCB-Crane-Operator', slug: 'jcb-operator', image: require("../../assets/images/Services Images/Local Worker/13. Driving & Transport Services/JCB-Crane-Operator.jpeg") },
      { name: 'Private-Chauffeur', slug: 'chauffeur', image: require("../../assets/images/Services Images/Local Worker/13. Driving & Transport Services/Private-Chauffeur.jpeg") },
      { name: 'Taxi-Driver', slug: 'taxi-driver', image: require("../../assets/images/Services Images/Local Worker/13. Driving & Transport Services/Taxi-Driver.jpeg") },
      { name: 'Tempo-Mini-Van-Driver', slug: 'tempo-driver', image: require("../../assets/images/Services Images/Local Worker/13. Driving & Transport Services/Tempo-Mini-Van-Driver.jpeg") },
      { name: 'Tractor-Driver', slug: 'tractor-driver', image: require("../../assets/images/Services Images/Local Worker/13. Driving & Transport Services/Tractor-Driver.jpeg") },
      { name: 'Truck-Driver', slug: 'truck-driver', image: require("../../assets/images/Services Images/Local Worker/13. Driving & Transport Services/Truck-Driver.jpeg") },
    ],
  },
  {
    id: '14',
    name: 'Training and Teaching Services',
    services: [
      { name: 'Corporate-Trainers', slug: 'corp-trainer', image: require("../../assets/images/Services Images/Local Worker/14. Training and Teaching Services/Corporate-Trainers.jpeg") },
      { name: 'Dance-Teacher', slug: 'dance-train', image: require("../../assets/images/Services Images/Local Worker/14. Training and Teaching Services/Dance-Teacher.jpeg") },
      { name: 'Gym-Trainer', slug: 'gym-train', image: require("../../assets/images/Services Images/Local Worker/14. Training and Teaching Services/Gym-Trainer.jpeg") },
      { name: 'Home Tutor', slug: 'tutor-train', image: require("../../assets/images/Services Images/Local Worker/14. Training and Teaching Services/Home Tutor.jpeg") },
      { name: 'Music-Teacher', slug: 'music-train', image: require("../../assets/images/Services Images/Local Worker/14. Training and Teaching Services/Music-Teacher.jpeg") },
      { name: 'Sales-Trainers', slug: 'sales-train', image: require("../../assets/images/Services Images/Local Worker/14. Training and Teaching Services/Sales-Trainers.jpeg") },
      { name: 'Yoga-Trainer', slug: 'yoga-train', image: require("../../assets/images/Services Images/Local Worker/14. Training and Teaching Services/Yoga-Trainer.jpeg") },
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
      { name: 'DJ-Provider', slug: 'dj', image: require("../../assets/images/Services Images/Professional Services/1. Professional Profession/DJ-Provider.jpeg") },
      { name: 'Doctor', slug: 'doctor', image: require("../../assets/images/Services Images/Professional Services/1. Professional Profession/Doctor.jpeg") },
      { name: 'Gym', slug: 'gym-pro', image: require("../../assets/images/Services Images/Professional Services/1. Professional Profession/Gym.jpeg") },
      { name: 'Insurance-Agent', slug: 'insurance', image: require("../../assets/images/Services Images/Professional Services/1. Professional Profession/Insurance-Agent.jpeg") },
      { name: 'Journalist-media', slug: 'journalist', image: require("../../assets/images/Services Images/Professional Services/1. Professional Profession/Journalist-media.jpeg") },
      { name: 'Lawer', slug: 'lawyer', image: require("../../assets/images/Services Images/Professional Services/1. Professional Profession/Lawer.jpeg") },
      { name: 'Nurse', slug: 'nurse-pro', image: require("../../assets/images/Services Images/Professional Services/1. Professional Profession/Nurse.jpeg") },
      { name: 'Photographer', slug: 'photographer', image: require("../../assets/images/Services Images/Professional Services/1. Professional Profession/Photographer.jpeg") },
      { name: 'Photography-Studio', slug: 'photo-studio', image: require("../../assets/images/Services Images/Professional Services/1. Professional Profession/Photography-Studio.jpeg") },
      { name: 'Real-Estate-Agent', slug: 'real-estate', image: require("../../assets/images/Services Images/Professional Services/1. Professional Profession/Real-Estate-Agent.jpeg") },
      { name: 'Travel-Agency', slug: 'travel-agency', image: require("../../assets/images/Services Images/Professional Services/1. Professional Profession/Travel-Agency.jpeg") },
      { name: 'Typist-Document-Writer', slug: 'typist', image: require("../../assets/images/Services Images/Professional Services/1. Professional Profession/Typist-Document-Writer.jpeg") },
    ],
  },
  {
    id: '16',
    name: 'Architecture & Designer Professionals',
    services: [
      { name: 'Architectural-Design', slug: 'architect', image: require("../../assets/images/Services Images/Professional Services/2. Architecture & Designer Professionals/Architectural-Design.jpeg") },
      { name: 'Civil-Contractor', slug: 'civil-contractor', image: require("../../assets/images/Services Images/Professional Services/2. Architecture & Designer Professionals/Civil-Contractor.jpeg") },
      { name: 'Interior-Designers', slug: 'interior-designer', image: require("../../assets/images/Services Images/Professional Services/2. Architecture & Designer Professionals/Interior-Designers.jpeg") },
      { name: 'UX-UI-Designer', slug: 'uiux-designer', image: require("../../assets/images/Services Images/Professional Services/2. Architecture & Designer Professionals/UX-UI-Designer.jpeg") },
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
      { name: 'Voiceover-Artist', slug: 'voiceover', image: require("../../assets/images/Services Images/Professional Services/3. Arts, Entertainment & Media/Voiceover-Artist.jpeg") },
    ],
  },

  // --- SHOPS SECTION (ID 18-32) ---
  {
    id: '18',
    name: 'Home & Living',
    services: [
      { name: 'Home-Decor-Shop', slug: 'decor-shop', image: require("../../assets/images/Services Images/Shops/1. Home & Living/Home-Decor-Shop.jpeg") },
      { name: 'Mattress-Store', slug: 'mattress-store', image: require("../../assets/images/Services Images/Shops/1. Home & Living/Mattress-Store.jpeg") },
      { name: 'Paint-Shop', slug: 'paint-shop', image: require("../../assets/images/Services Images/Shops/1. Home & Living/Paint-Shop.jpeg") },
      { name: 'Plywood-&-Timber-Shop', slug: 'plywood-shop', image: require("../../assets/images/Services Images/Shops/1. Home & Living/Plywood-and-Timber-Shop.jpeg") },
      { name: 'Curtain-&-Blinds-Shop', slug: 'curtain-shop', image: require("../../assets/images/Services Images/Shops/1. Home & Living/Curtain-and-Blinds-Shop.jpeg") },
      { name: 'Furniture-Shop', slug: 'furniture-shop', image: require("../../assets/images/Services Images/Shops/1. Home & Living/Furniture-Shop.jpeg") },
      { name: 'Glass-&-Aluminum-Shop', slug: 'glass-shop', image: require("../../assets/images/Services Images/Shops/1. Home & Living/Glass-and-Aluminum-Shop.jpeg") },
    ],
  },
  {
    id: '19',
    name: 'Automobile & Transport',
    services: [
      { name: 'Battery-Shop', slug: 'battery-shop', image: require("../../assets/images/Services Images/Shops/2. Automobile & Transport/Battery-Shop.jpeg") },
      { name: 'Bike-Repair-Shop', slug: 'bike-repair', image: require("../../assets/images/Services Images/Shops/2. Automobile & Transport/Bike-Repair-Shop.jpeg") },
      { name: 'Bike-Showroom', slug: 'bike-showroom', image: require("../../assets/images/Services Images/Shops/2. Automobile & Transport/Bike-Showroom.jpeg") },
      { name: 'Bike-Washing-Center', slug: 'bike-wash', image: require("../../assets/images/Services Images/Shops/2. Automobile & Transport/Bike-Washing-Center.jpeg") },
      { name: 'Car-Accessories-Shop', slug: 'car-accessories', image: require("../../assets/images/Services Images/Shops/2. Automobile & Transport/Car-Accessories-Shop.jpeg") },
      { name: 'Car-Service-Center', slug: 'car-service', image: require("../../assets/images/Services Images/Shops/2. Automobile & Transport/Car-Service-Center.jpeg") },
      { name: 'Car-Showroom', slug: 'car-showroom', image: require("../../assets/images/Services Images/Shops/2. Automobile & Transport/Car-Showroom.jpeg") },
      { name: 'Car-Washing-Center', slug: 'car-wash-shop', image: require("../../assets/images/Services Images/Shops/2. Automobile & Transport/Car-Washing-Center.jpeg") },
      { name: 'Tyre-Shop', slug: 'tyre-shop', image: require("../../assets/images/Services Images/Shops/2. Automobile & Transport/Tyre-Shop.jpeg") },
      { name: 'Used-Car-Dealer', slug: 'used-car', image: require("../../assets/images/Services Images/Shops/2. Automobile & Transport/Used-Car-Dealer.jpeg") },
    ],
  },
  {
    id: '20',
    name: 'Food & Beverage',
    services: [
      { name: 'Bakery-shop', slug: 'bakery', image: require("../../assets/images/Services Images/Shops/3. Food & Beverage/Bakery-shop.jpeg") },
      { name: 'Cake-Shop', slug: 'cake-shop', image: require("../../assets/images/Services Images/Shops/3. Food & Beverage/Cake-Shop.jpeg") },
      { name: 'Coffee-Shop', slug: 'coffee-shop', image: require("../../assets/images/Services Images/Shops/3. Food & Beverage/Coffee-Shop.jpeg") },
      { name: 'Dhaba', slug: 'dhaba', image: require("../../assets/images/Services Images/Shops/3. Food & Beverage/Dhaba.jpeg") },
      { name: 'Fast-Food-Center', slug: 'fast-food', image: require("../../assets/images/Services Images/Shops/3. Food & Beverage/Fast-Food-Center.jpeg") },
      { name: 'Fruit-Seller', slug: 'fruit-shop', image: require("../../assets/images/Services Images/Shops/3. Food & Beverage/Fruit-Seller.jpeg") },
      { name: 'Grain Seller', slug: 'grain-seller', image: require("../../assets/images/Services Images/Shops/3. Food & Beverage/Grain Seller.jpeg") },
      { name: 'Hotel-Services', slug: 'hotel-shop', image: require("../../assets/images/Services Images/Shops/3. Food & Beverage/Hotel-Services.jpeg") },
      { name: 'Ice-Cream-Seller', slug: 'ice-cream-shop', image: require("../../assets/images/Services Images/Shops/3. Food & Beverage/Ice-Cream-Seller.jpeg") },
      { name: 'Juice-Seller', slug: 'juice-shop', image: require("../../assets/images/Services Images/Shops/3. Food & Beverage/Juice-Seller.jpeg") },
      { name: 'Restaurant-Services', slug: 'restaurant', image: require("../../assets/images/Services Images/Shops/3. Food & Beverage/Restaurant-Services.jpeg") },
      { name: 'Sweet-Seller-(Halwai)', slug: 'sweet-shop', image: require("../../assets/images/Services Images/Shops/3. Food & Beverage/Sweet-Seller-(Halwai).jpeg") },
      { name: 'Tea-Shop', slug: 'tea-shop', image: require("../../assets/images/Services Images/Shops/3. Food & Beverage/Tea-Shop.jpeg") },
    ],
  },
  {
    id: '21',
    name: 'Daily Needs & Retail',
    services: [
      { name: 'General-Store', slug: 'general-store', image: require("../../assets/images/Services Images/Shops/4. Daily Needs & Retail/General-Store.jpeg") },
      { name: 'Grocery-Shop', slug: 'grocery-shop', image: require("../../assets/images/Services Images/Shops/4. Daily Needs & Retail/Grocery-Shop.jpeg") },
      { name: 'Kirana-Shop', slug: 'kirana-shop', image: require("../../assets/images/Services Images/Shops/4. Daily Needs & Retail/Kirana-Shop.jpeg") },
      { name: 'Supermarket', slug: 'supermarket', image: require("../../assets/images/Services Images/Shops/4. Daily Needs & Retail/Supermarket.jpeg") },
    ],
  },
  {
    id: '22',
    name: 'Fashion & Lifestyle',
    services: [
      { name: 'Fashion-Accessories-Shop', slug: 'fashion-shop', image: require("../../assets/images/Services Images/Shops/5. Fashion & Lifestyle/Fashion-Accessories-Shop.jpeg") },
      { name: 'Footwear-Store', slug: 'footwear-store', image: require("../../assets/images/Services Images/Shops/5. Fashion & Lifestyle/Footwear-Store.jpeg") },
      { name: 'Hair-Salon', slug: 'hair-salon-shop', image: require("../../assets/images/Services Images/Shops/5. Fashion & Lifestyle/Hair-Salon.jpeg") },
      { name: 'Kids-Wear-Shop', slug: 'kids-wear', image: require("../../assets/images/Services Images/Shops/5. Fashion & Lifestyle/Kids-Wear-Shop.jpeg") },
      { name: "Men's-Wear-Shop", slug: 'mens-wear', image: require("../../assets/images/Services Images/Shops/5. Fashion & Lifestyle/Men's-Wear-Shop.jpeg") },
      { name: 'Saree-Shop', slug: 'saree-shop', image: require("../../assets/images/Services Images/Shops/5. Fashion & Lifestyle/Saree-Shop.jpeg") },
      { name: "Women's-Wear-Shop", slug: 'womens-wear', image: require("../../assets/images/Services Images/Shops/5. Fashion & Lifestyle/Women's-Wear-Shop.jpeg") },
    ],
  },
  {
    id: '23',
    name: 'Jewelry & Luxury',
    services: [
      { name: 'Diamond-Jewelry-Store', slug: 'diamond-shop', image: require("../../assets/images/Services Images/Shops/6. Jewelry & Luxury/Diamond-Jewelry-Store.jpeg") },
      { name: 'Gold-&-Silver-Shop', slug: 'gold-shop', image: require("../../assets/images/Services Images/Shops/6. Jewelry & Luxury/Gold-and-Silver-Shop.jpeg") },
      { name: 'Jewelry-Shop', slug: 'jewelry-shop', image: require("../../assets/images/Services Images/Shops/6. Jewelry & Luxury/Jewelry-Shop.jpeg") },
      { name: 'Watch-Store', slug: 'watch-store', image: require("../../assets/images/Services Images/Shops/6. Jewelry & Luxury/Watch-Store.jpeg") },
    ],
  },
  {
    id: '24',
    name: 'Beauty & Wellness',
    services: [
      { name: 'Beauty-Parlor', slug: 'beauty-parlor', image: require("../../assets/images/Services Images/Shops/7. Beauty & Wellness/Beauty-Parlor.jpeg") },
      { name: 'Cosmetic-Store', slug: 'cosmetic-shop', image: require("../../assets/images/Services Images/Shops/7. Beauty & Wellness/Cosmetic-Store.jpeg") },
      { name: 'Fitness-Studio', slug: 'fitness-studio', image: require("../../assets/images/Services Images/Shops/7. Beauty & Wellness/Fitness-Studio.jpeg") },
      { name: 'Salon', slug: 'salon-shop', image: require("../../assets/images/Services Images/Shops/7. Beauty & Wellness/Salon.jpeg") },
      { name: 'Spa-&-Massage-Center', slug: 'spa-center', image: require("../../assets/images/Services Images/Shops/7. Beauty & Wellness/Spa-and-Massage-Center.jpeg") },
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
      { name: 'AC-Repair', slug: 'ac-repair-shop', image: require("../../assets/images/Services Images/Shops/9. Services & Repairs/AC-Repair.jpeg") },
      { name: 'Carpenter', slug: 'carpenter-shop', image: require("../../assets/images/Services Images/Shops/9. Services & Repairs/Carpenter.jpeg") },
      { name: 'Computer-Laptop-Technician', slug: 'comp-tech-shop', image: require("../../assets/images/Services Images/Shops/9. Services & Repairs/Computer-Laptop-Technician.jpeg") },
      { name: 'Electrician', slug: 'electrician-shop', image: require("../../assets/images/Services Images/Shops/9. Services & Repairs/Electrician.jpeg") },
      { name: 'Fan,Tv,Fridge-Repair', slug: 'appliance-shop', image: require("../../assets/images/Services Images/Shops/9. Services & Repairs/Fan,Tv,Fridge-Repair.jpeg") },
      { name: 'Inverter-&-Battery-Technician', slug: 'inverter-shop', image: require("../../assets/images/Services Images/Shops/9. Services & Repairs/Inverter-and-Battery-Technician.jpeg") },
      { name: 'Mechanic', slug: 'mechanic-shop', image: require("../../assets/images/Services Images/Shops/9. Services & Repairs/Mechanic.jpeg") },
      { name: 'Mobile-Repair', slug: 'mobile-repair-shop', image: require("../../assets/images/Services Images/Shops/9. Services & Repairs/Mobile-Repair.jpeg") },
      { name: 'Plumber', slug: 'plumber-shop', image: require("../../assets/images/Services Images/Shops/9. Services & Repairs/Plumber.jpeg") },
      { name: 'RO-Water-Purifier-Service', slug: 'ro-shop', image: require("../../assets/images/Services Images/Shops/9. Services & Repairs/RO-Water-Purifier-Service.jpeg") },
    ],
  },
  {
    id: '27',
    name: 'Electronics & Appliances',
    services: [
      { name: 'CCTV-&-Security-Shop', slug: 'cctv-shop', image: require("../../assets/images/Services Images/Shops/10. Electronics & Appliances/CCTV-and-Security-Shop.jpeg") },
      { name: 'Computer-Shop', slug: 'computer-shop', image: require("../../assets/images/Services Images/Shops/10. Electronics & Appliances/Computer-Shop.jpeg") },
      { name: 'Electronics-Shop', slug: 'electronics-shop', image: require("../../assets/images/Services Images/Shops/10. Electronics & Appliances/Electronics-Shop.jpeg") },
      { name: 'Home-Appliances-Store', slug: 'appliance-store', image: require("../../assets/images/Services Images/Shops/10. Electronics & Appliances/Home-Appliances-Store.jpeg") },
      { name: 'Mobile-Store', slug: 'mobile-store', image: require("../../assets/images/Services Images/Shops/10. Electronics & Appliances/Mobile-Store.jpeg") },
      { name: 'Printer-&-Accessories-Store', slug: 'printer-shop', image: require("../../assets/images/Services Images/Shops/10. Electronics & Appliances/Printer-and-Accessories-Store.jpeg") },
    ],
  },
  {
    id: '28',
    name: 'Education & Offices',
    services: [
      { name: 'Book-Store', slug: 'book-store', image: require("../../assets/images/Services Images/Shops/11. Education & Knowledge Services/Book-Store.jpeg") },
      { name: 'Coaching-Classes', slug: 'coaching', image: require("../../assets/images/Services Images/Shops/11. Education & Knowledge Services/Coaching-Classes.jpeg") },
      { name: 'Computer-Training-Institute', slug: 'comp-inst', image: require("../../assets/images/Services Images/Shops/11. Education & Knowledge Services/Computer-Training-Institute.jpeg") },
      { name: 'Printing-and-Xerox-Shop', slug: 'xerox-shop', image: require("../../assets/images/Services Images/Shops/11. Education & Knowledge Services/Printing-and-Xerox-Shop.jpeg") },
      { name: 'Stationary-Shop', slug: 'stationary-shop', image: require("../../assets/images/Services Images/Shops/11. Education & Knowledge Services/Stationary-Shop.jpeg") },
    ],
  },
  {
    id: '29',
    name: 'Construction & Industrial',
    services: [
      { name: 'Building-Material-Supplier-shop', slug: 'building-mat', image: require("../../assets/images/Services Images/Shops/12. Construction & Industrial/Building-Material-Supplier-shop.jpeg") },
      { name: 'Cement', slug: 'cement-shop', image: require("../../assets/images/Services Images/Shops/12. Construction & Industrial/Cement.jpeg") },
      { name: 'Electrical-Materials', slug: 'electrical-mat', image: require("../../assets/images/Services Images/Shops/12. Construction & Industrial/Electrical-Materials.jpeg") },
      { name: 'Fabrication', slug: 'fab-shop', image: require("../../assets/images/Services Images/Shops/12. Construction & Industrial/Fabrication.jpeg") },
      { name: 'Sanitaryware', slug: 'sanitary-shop', image: require("../../assets/images/Services Images/Shops/12. Construction & Industrial/Sanitaryware.jpeg") },
      { name: 'Welding-Works', slug: 'welding-shop', image: require("../../assets/images/Services Images/Shops/12. Construction & Industrial/Welding-Works.jpeg") },
    ],
  },
  {
    id: '30',
    name: 'Pets & Animals',
    services: [
      { name: 'Aquarium', slug: 'aquarium-shop', image: require("../../assets/images/Services Images/Shops/13. Pets & Animals/Aquarium.jpeg") },
      { name: 'Pet-Birds-Shop', slug: 'bird-shop', image: require("../../assets/images/Services Images/Shops/13. Pets & Animals/Pet-Birds-Shop.jpeg") },
      { name: 'Pet-Dogs-Shop', slug: 'dog-shop', image: require("../../assets/images/Services Images/Shops/13. Pets & Animals/Pet-Dogs-Shop.jpeg") },
      { name: 'Pet-Food', slug: 'pet-food-shop', image: require("../../assets/images/Services Images/Shops/13. Pets & Animals/Pet-Food.jpeg") },
    ],
  },
  {
    id: '31',
    name: 'Events & Miscellaneous',
    services: [
      { name: 'Event-Organizer', slug: 'event-org', image: require("../../assets/images/Services Images/Shops/14. Events & Miscellaneous/Event-Organizer.jpeg") },
      { name: 'Gift-Shop', slug: 'gift-shop', image: require("../../assets/images/Services Images/Shops/14. Events & Miscellaneous/Gift-Shop.jpeg") },
      { name: 'Marriage-Hall-Organizer', slug: 'marriage-hall', image: require("../../assets/images/Services Images/Shops/14. Events & Miscellaneous/Marriage-Hall-Organizer.jpeg") },
    ],
  },
  {
    id: '32',
    name: 'Hardware & Tools Shops',
    services: [
      { name: 'Carpentry-Tools-Shop', slug: 'carpentry-tools', image: require("../../assets/images/Services Images/Shops/15. Hardware & Tools Shops/Carpentry-Tools-Shop.jpeg") },
      { name: 'Hardware-Parts-Shop', slug: 'hardware-shop', image: require("../../assets/images/Services Images/Shops/15. Hardware & Tools Shops/Hardware-Parts-Shop.jpeg") },
      { name: 'Plumbing-Equipment-Shop', slug: 'plumbing-equip', image: require("../../assets/images/Services Images/Shops/15. Hardware & Tools Shops/Plumbing-Equipment-Shop.jpeg") },
    ],
  },
];

export default function ServicesPage() {
  const router = useRouter();
  
  // Tab State
  const [activeTab, setActiveTab] = useState<'local' | 'pro' | 'shops'>('local');

  // Search & Voice States
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [voiceModalVisible, setVoiceModalVisible] = useState(false);
  const [voiceStep, setVoiceStep] = useState<'listening' | 'result'>('listening');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering Logic based on Section Switcher
  const filteredCategories = categories.filter(cat => {
    const id = parseInt(cat.id);
    let inTab = false;
    if (activeTab === 'local') inTab = id <= 14;
    else if (activeTab === 'pro') inTab = id >= 15 && id <= 17;
    else if (activeTab === 'shops') inTab = id >= 18;

    if (!inTab) return false;

    return cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           cat.services.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const handleVoiceTrigger = () => {
    setVoiceStep('listening');
    setVoiceModalVisible(true);
    setTimeout(() => { setVoiceStep('result'); }, 2000);
  };

  // Helper function to group services into pairs for vertical stack
  const groupInPairs = (arr: any[]) => {
    const pairs = [];
    for (let i = 0; i < arr.length; i += 2) {
      pairs.push(arr.slice(i, i + 2));
    }
    return pairs;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. STICKY HEADER & SEARCH BAR */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Services</Text>

        <View style={styles.searchRow}>
          <TouchableOpacity 
            activeOpacity={1} 
            style={styles.searchBar} 
            onPress={() => setSearchVisible(true)}
          >
            <Search size={20} color="#999" />
            <Text style={styles.searchPlaceholderText}>{searchQuery || "Search for services..."}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.micBtn} onPress={handleVoiceTrigger}>
            <Mic size={22} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* 2. SECTION SWITCHER */}
        <View style={styles.tabWrapper}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'local' && styles.activeTab]} 
            onPress={() => setActiveTab('local')}
          >
            <Text style={[styles.tabText, activeTab === 'local' && styles.activeTabText]}>Local Workers</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'pro' && styles.activeTab]} 
            onPress={() => setActiveTab('pro')}
          >
            <Text style={[styles.tabText, activeTab === 'pro' && styles.activeTabText]}>Professional Services</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'shops' && styles.activeTab]} 
            onPress={() => setActiveTab('shops')}
          >
            <Text style={[styles.tabText, activeTab === 'shops' && styles.activeTabText]}>Shops</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 3. CONTENT AREA WITH VERTICAL STACK CAROUSEL */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filteredCategories.length > 0 ? (
          filteredCategories.map(category => (
            <View key={category.id} style={styles.section}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryTitle}>{category.name}</Text>
                <TouchableOpacity><Text style={styles.viewAllText}>View All</Text></TouchableOpacity>
              </View>

              <View style={styles.carouselContainer}>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false} 
                  snapToInterval={ITEM_WIDTH + 12}
                  decelerationRate="fast"
                  contentContainerStyle={{ paddingLeft: 16 }}
                >
                  {groupInPairs(category.services).map((pair, index) => (
                    <View key={index} style={styles.verticalBlock}>
                      {pair.map((service) => (
                        <TouchableOpacity 
                          key={service.slug} 
                          style={styles.serviceCard}
                          onPress={() => router.push({ pathname: '/service/[id]', params: { id: service.slug } } as any)}
                        >
                          <View style={styles.imgWrapper}>
                            {service.image ? (
                              <Image 
                                source={typeof service.image === 'string' ? { uri: service.image } : service.image} 
                                style={styles.serviceImage} 
                              />
                            ) : (
                              <View style={styles.imagePlaceholder} />
                            )}
                          </View>
                          <Text style={styles.serviceName} numberOfLines={1}>{service.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ))}
                </ScrollView>
                
                {/* Navigation Hint Arrows */}
                <View style={[styles.navArrow, { left: 0 }]}><ChevronLeft size={16} color="#333" /></View>
                <View style={[styles.navArrow, { right: 0 }]}><ChevronRight size={16} color="#333" /></View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.noResultContainer}>
             <Text style={styles.noResultText}>No services found in this section.</Text>
          </View>
        )}
      </ScrollView>

      {/* 4. MODAL: SEARCH OVERLAY (FROM HOME PAGE) */}
      <Modal visible={isSearchVisible} animationType="slide" onRequestClose={() => setSearchVisible(false)}>
        <SafeAreaView style={styles.searchOverlay}>
          <View style={styles.searchHeaderOverlay}>
            <TouchableOpacity onPress={() => setSearchVisible(false)}><ArrowLeft size={24} color="#333" /></TouchableOpacity>
            <Text style={styles.searchTitleOverlay}>Search</Text>
          </View>

          <View style={styles.searchInputContainerOverlay}>
            <Search size={22} color="#666" style={{ marginRight: 10 }} />
            <TextInput 
              placeholder="Find Electrician, Maid, or Shop..." 
              style={styles.fullSearchInput} 
              autoFocus={true} 
              value={searchQuery} 
              onChangeText={setSearchQuery} 
            />
          </View>

          <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
            <Text style={styles.searchSectionTitle}>Your history</Text>
            <View style={styles.pillsRow}>
              {['Maid', 'Cook', 'Plumber', 'Electrician'].map((text, i) => (
                <TouchableOpacity key={i} style={styles.pill} onPress={() => {setSearchQuery(text); setSearchVisible(false);}}>
                  <Text style={styles.pillText}>{text}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.searchSectionTitle}>Search by category</Text>
            <View style={styles.searchGridOverlay}>
              {sevadharCategories.map((item) => (
                <TouchableOpacity key={item.id} style={styles.searchGridItemOverlay} onPress={() => { setSearchQuery(item.name); setSearchVisible(false); }}>
                  <item.icon size={22} color={item.color} style={{ marginRight: 12 }} />
                  <Text style={styles.searchGridTextOverlay}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.searchSectionTitle}>Trending searches</Text>
            <View style={styles.pillsRow}>
              {['AC Repair', 'Deep Clean', 'Mali', 'Doctor', 'Tailor', 'Pandit'].map((text, i) => (
                <TouchableOpacity key={i} style={styles.pill} onPress={() => {setSearchQuery(text); setSearchVisible(false);}}>
                  <Text style={styles.pillText}>{text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* 5. MODAL: VOICE SEARCH */}
      <Modal visible={voiceModalVisible} transparent={true} animationType="fade">
        <View style={styles.voiceOverlayBg}>
          <View style={styles.voiceContainer}>
            <TouchableOpacity style={styles.closeVoice} onPress={() => setVoiceModalVisible(false)}><X size={24} color="#666" /></TouchableOpacity>
            <Text style={styles.voiceTitle}>Voice Search</Text>
            {voiceStep === 'listening' ? (
              <><Text style={styles.voiceInstruction}>Listening...</Text><View style={styles.voiceMicCircle}><Mic size={40} color="#FFF" /></View></>
            ) : (
              <><Text style={styles.voiceInstruction}>Search result:</Text><View style={styles.voiceResultBox}><Text style={styles.voiceResultText}>"Plumber"</Text></View>
                <View style={styles.voiceActionRow}><TouchableOpacity style={styles.voiceTryAgain} onPress={() => setVoiceStep('listening')}><Text style={styles.tryAgainText}>Try Again</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.voiceSearchBtn} onPress={() => { setVoiceModalVisible(false); setSearchQuery('Plumber'); }}><Text style={styles.searchBtnText}>Search</Text></TouchableOpacity></View></>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { paddingTop: 40, paddingHorizontal: 16, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  searchRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  searchBar: { flex: 1, flexDirection: 'row', backgroundColor: '#F3F4F6', borderRadius: 16, paddingHorizontal: 16, alignItems: 'center', height: 54, borderWidth: 1, borderColor: '#E5E7EB' },
  searchPlaceholderText: { flex: 1, marginLeft: 10, fontSize: 16, color: '#999' },
  micBtn: { width: 54, height: 54, borderRadius: 16, backgroundColor: '#FF7A00', alignItems: 'center', justifyContent: 'center' },
  tabWrapper: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: '#FF7A00' },
  tabText: { fontSize: 12, fontWeight: 'bold', color: '#888' },
  activeTabText: { color: '#FF7A00' },

  scrollContent: { paddingBottom: 100 },
  section: { marginTop: 24 },
  categoryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 15 },
  categoryTitle: { fontSize: 17, fontWeight: 'bold', color: '#111' },
  viewAllText: { fontSize: 13, color: '#FF7A00', fontWeight: 'bold' },

  // Carousel Vertical Stack Styles
  carouselContainer: { position: 'relative' },
  verticalBlock: { width: ITEM_WIDTH, marginRight: 12, gap: 12 },
  serviceCard: { width: '100%', backgroundColor: '#FFF', borderRadius: 15, padding: 8, borderWidth: 1, borderColor: '#F0F0F0', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  imgWrapper: { height: ITEM_WIDTH * 0.55, borderRadius: 10, overflow: 'hidden', backgroundColor: '#F9FAFB' },
  serviceImage: { width: '100%', height: '100%' },
  imagePlaceholder: { flex: 1, backgroundColor: '#EEE' },
  serviceName: { fontSize: 12, fontWeight: 'bold', color: '#333', textAlign: 'center', marginTop: 8 },
  navArrow: { position: 'absolute', top: '40%', backgroundColor: 'rgba(255,255,255,0.8)', width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', elevation: 3, zIndex: 10 },

  noResultContainer: { marginTop: 50, alignItems: 'center' },
  noResultText: { color: '#666', fontSize: 14 },

  // Modal Styles (From Home Page)
  searchOverlay: { flex: 1, backgroundColor: '#FFF' },
  searchHeaderOverlay: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  searchTitleOverlay: { fontSize: 20, fontWeight: 'bold', marginLeft: 16 },
  searchInputContainerOverlay: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', marginHorizontal: 16, borderRadius: 30, paddingHorizontal: 16, height: 50, marginBottom: 20, borderWidth: 1, borderColor: '#EEE' },
  fullSearchInput: { flex: 1, fontSize: 16 },
  searchSectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 15 },
  pillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  pill: { backgroundColor: '#F3F4F6', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#E5E7EB' },
  pillText: { fontSize: 14, color: '#444' },
  searchGridOverlay: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  searchGridItemOverlay: { width: '48%', flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 15, borderRadius: 15, borderWidth: 1, borderColor: '#EEE', marginBottom: 12 },
  searchGridTextOverlay: { fontSize: 13, fontWeight: '600', color: '#333' },

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
  tryAgainText: { color: '#FF7A00', fontWeight: 'bold' },
  voiceSearchBtn: { flex: 1, height: 50, borderRadius: 12, backgroundColor: '#FF7A00', justifyContent: 'center', alignItems: 'center' },
  searchBtnText: { color: '#FFF', fontWeight: 'bold' }
});