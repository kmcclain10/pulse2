from fastapi import FastAPI, APIRouter, HTTPException, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime, date
from enum import Enum
import os
import uuid
import logging
from pathlib import Path

# Load environment variables
from dotenv import load_dotenv
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'pulse_auto_market')
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

# FastAPI app
app = FastAPI(title="PULSE Auto Market API", version="1.0.0")
api_router = APIRouter(prefix="/api")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Enums
class VehicleStatus(str, Enum):
    AVAILABLE = "Available"
    SOLD = "Sold"
    PENDING = "Pending"
    HOLD = "Hold"

class LeadStatus(str, Enum):
    NEW = "New"
    CONTACTED = "Contacted"
    QUALIFIED = "Qualified"
    LOST = "Lost"
    SOLD = "Sold"

class DealStatus(str, Enum):
    PENDING = "Pending"
    APPROVED = "Approved"
    FUNDED = "Funded"
    DECLINED = "Declined"

# Pydantic Models
class Vehicle(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    vin: Optional[str] = None
    year: int
    make: str
    model: str
    trim: Optional[str] = None
    mileage: int
    price: float
    cost: Optional[float] = None
    exterior_color: Optional[str] = None
    interior_color: Optional[str] = None
    transmission: Optional[str] = None
    fuel_type: Optional[str] = None
    drivetrain: Optional[str] = None
    engine: Optional[str] = None
    images: List[str] = []
    features: List[str] = []
    status: VehicleStatus = VehicleStatus.AVAILABLE
    dealer_id: str
    dealer_name: str
    stock_number: Optional[str] = None
    description: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class VehicleCreate(BaseModel):
    vin: Optional[str] = None
    year: int
    make: str
    model: str
    trim: Optional[str] = None
    mileage: int
    price: float
    cost: Optional[float] = None
    exterior_color: Optional[str] = None
    interior_color: Optional[str] = None
    transmission: Optional[str] = None
    fuel_type: Optional[str] = None
    drivetrain: Optional[str] = None
    engine: Optional[str] = None
    images: List[str] = []
    features: List[str] = []
    dealer_id: str
    dealer_name: str
    stock_number: Optional[str] = None
    description: Optional[str] = None

class Lead(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    customer_name: str
    email: str
    phone: str
    vehicle_id: Optional[str] = None
    vehicle_interest: Optional[str] = None
    message: Optional[str] = None
    status: LeadStatus = LeadStatus.NEW
    source: str = "Website"
    dealer_id: str
    assigned_to: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    follow_up_date: Optional[datetime] = None
    notes: List[str] = []

class LeadCreate(BaseModel):
    customer_name: str
    email: str
    phone: str
    vehicle_id: Optional[str] = None
    vehicle_interest: Optional[str] = None
    message: Optional[str] = None
    dealer_id: str

class Customer(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    first_name: str
    last_name: str
    email: str
    phone: str
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    date_of_birth: Optional[date] = None
    ssn: Optional[str] = None  # Encrypted in production
    credit_score: Optional[int] = None
    annual_income: Optional[float] = None
    employment_status: Optional[str] = None
    employer: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Deal(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    customer_id: str
    vehicle_id: str
    dealer_id: str
    sales_person: str
    
    # Vehicle Information
    vehicle_price: float
    trade_value: Optional[float] = 0.0
    down_payment: float = 0.0
    
    # Finance Information
    loan_amount: float
    interest_rate: float
    loan_term: int  # months
    monthly_payment: float
    
    # Add-ons and Fees
    extended_warranty: float = 0.0
    gap_insurance: float = 0.0
    credit_life: float = 0.0
    disability_insurance: float = 0.0
    service_contract: float = 0.0
    
    # Taxes and Fees
    sales_tax: float = 0.0
    doc_fee: float = 0.0
    title_fee: float = 0.0
    registration_fee: float = 0.0
    
    # Totals
    total_add_ons: float = 0.0
    total_fees: float = 0.0
    total_amount_financed: float = 0.0
    
    # Deal Status
    status: DealStatus = DealStatus.PENDING
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Finance Application
    lender: Optional[str] = None
    approval_amount: Optional[float] = None
    approved_rate: Optional[float] = None
    approved_term: Optional[int] = None

class DeskingCalculation(BaseModel):
    vehicle_price: float
    trade_value: float = 0.0
    down_payment: float = 0.0
    
    # Add-ons
    extended_warranty: float = 0.0
    gap_insurance: float = 0.0
    credit_life: float = 0.0
    disability_insurance: float = 0.0
    service_contract: float = 0.0
    
    # Taxes and Fees
    sales_tax_rate: float = 0.0925  # Default 9.25%
    doc_fee: float = 699.0
    title_fee: float = 75.0
    registration_fee: float = 24.0
    
    # Finance Terms
    interest_rate: float = 7.5
    loan_term: int = 72

class RepairShop(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    address: str
    city: str
    state: str
    zip_code: str
    phone: str
    email: Optional[str] = None
    website: Optional[str] = None
    services: List[str] = []
    hours: Optional[str] = None
    rating: float = 0.0
    review_count: int = 0
    image_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Vehicle Endpoints
@api_router.get("/vehicles", response_model=List[Vehicle])
async def get_vehicles(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    make: Optional[str] = None,
    year: Optional[int] = None,
    max_price: Optional[float] = None,
    min_price: Optional[float] = None,
    status: Optional[VehicleStatus] = None,
    dealer_id: Optional[str] = None
):
    """Get vehicles with optional filtering"""
    query = {}
    
    if make:
        query["make"] = {"$regex": make, "$options": "i"}
    if year:
        query["year"] = year
    if max_price:
        query["price"] = {"$lte": max_price}
    if min_price:
        if "price" in query:
            query["price"]["$gte"] = min_price
        else:
            query["price"] = {"$gte": min_price}
    if status:
        query["status"] = status
    if dealer_id:
        query["dealer_id"] = dealer_id
    
    vehicles = await db.vehicles.find(query).skip(skip).limit(limit).to_list(length=limit)
    return [Vehicle(**vehicle) for vehicle in vehicles]

@api_router.get("/vehicles/{vehicle_id}", response_model=Vehicle)
async def get_vehicle(vehicle_id: str):
    """Get single vehicle by ID"""
    vehicle = await db.vehicles.find_one({"id": vehicle_id})
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return Vehicle(**vehicle)

@api_router.post("/vehicles", response_model=Vehicle)
async def create_vehicle(vehicle_data: VehicleCreate):
    """Create new vehicle"""
    vehicle = Vehicle(**vehicle_data.dict())
    await db.vehicles.insert_one(vehicle.dict())
    return vehicle

@api_router.put("/vehicles/{vehicle_id}", response_model=Vehicle)
async def update_vehicle(vehicle_id: str, vehicle_data: VehicleCreate):
    """Update existing vehicle"""
    update_data = vehicle_data.dict()
    update_data["updated_at"] = datetime.utcnow()
    
    result = await db.vehicles.update_one(
        {"id": vehicle_id},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    updated_vehicle = await db.vehicles.find_one({"id": vehicle_id})
    return Vehicle(**updated_vehicle)

@api_router.delete("/vehicles/{vehicle_id}")
async def delete_vehicle(vehicle_id: str):
    """Delete vehicle"""
    result = await db.vehicles.delete_one({"id": vehicle_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return {"message": "Vehicle deleted successfully"}

# Leads Endpoints
@api_router.get("/leads", response_model=List[Lead])
async def get_leads(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    status: Optional[LeadStatus] = None,
    dealer_id: Optional[str] = None
):
    """Get leads with optional filtering"""
    query = {}
    if status:
        query["status"] = status
    if dealer_id:
        query["dealer_id"] = dealer_id
    
    leads = await db.leads.find(query).skip(skip).limit(limit).to_list(length=limit)
    return [Lead(**lead) for lead in leads]

@api_router.post("/leads", response_model=Lead)
async def create_lead(lead_data: LeadCreate):
    """Create new lead"""
    lead = Lead(**lead_data.dict())
    await db.leads.insert_one(lead.dict())
    return lead

@api_router.put("/leads/{lead_id}", response_model=Lead)
async def update_lead(lead_id: str, status: LeadStatus, notes: Optional[str] = None):
    """Update lead status and add notes"""
    update_data = {
        "status": status,
        "updated_at": datetime.utcnow()
    }
    
    if notes:
        # Add note to notes array
        await db.leads.update_one(
            {"id": lead_id},
            {"$push": {"notes": f"{datetime.utcnow().isoformat()}: {notes}"}}
        )
    
    result = await db.leads.update_one(
        {"id": lead_id},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    updated_lead = await db.leads.find_one({"id": lead_id})
    return Lead(**updated_lead)

# Deal Management Endpoints
@api_router.post("/deals", response_model=Deal)
async def create_deal(deal_data: Deal):
    """Create new deal"""
    await db.deals.insert_one(deal_data.dict())
    return deal_data

@api_router.get("/deals", response_model=List[Deal])
async def get_deals(dealer_id: Optional[str] = None):
    """Get deals"""
    query = {}
    if dealer_id:
        query["dealer_id"] = dealer_id
    
    deals = await db.deals.find(query).to_list(length=1000)
    return [Deal(**deal) for deal in deals]

@api_router.get("/deals/{deal_id}", response_model=Deal)
async def get_deal(deal_id: str):
    """Get single deal"""
    deal = await db.deals.find_one({"id": deal_id})
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")
    return Deal(**deal)

# Desking Tool Endpoint
@api_router.post("/desking/calculate")
async def calculate_desking(calc: DeskingCalculation):
    """Calculate desking numbers"""
    
    # Calculate net trade difference
    net_trade_difference = calc.vehicle_price - calc.trade_value
    
    # Calculate total add-ons
    total_add_ons = (
        calc.extended_warranty + 
        calc.gap_insurance + 
        calc.credit_life + 
        calc.disability_insurance + 
        calc.service_contract
    )
    
    # Calculate subtotal before tax
    subtotal = net_trade_difference + total_add_ons
    
    # Calculate tax (on subtotal minus trade)
    taxable_amount = subtotal - calc.trade_value if calc.trade_value > 0 else subtotal
    sales_tax = taxable_amount * calc.sales_tax_rate
    
    # Calculate total fees
    total_fees = calc.doc_fee + calc.title_fee + calc.registration_fee
    
    # Calculate total amount financed
    total_amount_financed = subtotal + sales_tax + total_fees - calc.down_payment
    
    # Calculate monthly payment
    monthly_rate = (calc.interest_rate / 100) / 12
    monthly_payment = 0
    
    if monthly_rate > 0:
        monthly_payment = (total_amount_financed * monthly_rate * 
                         (1 + monthly_rate) ** calc.loan_term) / \
                        ((1 + monthly_rate) ** calc.loan_term - 1)
    else:
        monthly_payment = total_amount_financed / calc.loan_term
    
    return {
        "vehicle_price": calc.vehicle_price,
        "trade_value": calc.trade_value,
        "net_trade_difference": net_trade_difference,
        "down_payment": calc.down_payment,
        "total_add_ons": total_add_ons,
        "subtotal": subtotal,
        "sales_tax": sales_tax,
        "total_fees": total_fees,
        "total_amount_financed": total_amount_financed,
        "monthly_payment": round(monthly_payment, 2),
        "interest_rate": calc.interest_rate,
        "loan_term": calc.loan_term,
        "breakdown": {
            "extended_warranty": calc.extended_warranty,
            "gap_insurance": calc.gap_insurance,
            "credit_life": calc.credit_life,
            "disability_insurance": calc.disability_insurance,
            "service_contract": calc.service_contract,
            "doc_fee": calc.doc_fee,
            "title_fee": calc.title_fee,
            "registration_fee": calc.registration_fee
        }
    }

# Repair Shops Endpoints
@api_router.get("/repair-shops", response_model=List[RepairShop])
async def get_repair_shops(
    city: Optional[str] = None,
    state: Optional[str] = None,
    zip_code: Optional[str] = None,
    service: Optional[str] = None
):
    """Get repair shops with optional filtering"""
    query = {}
    
    if city:
        query["city"] = {"$regex": city, "$options": "i"}
    if state:
        query["state"] = {"$regex": state, "$options": "i"}
    if zip_code:
        query["zip_code"] = zip_code
    if service:
        query["services"] = {"$in": [service]}
    
    shops = await db.repair_shops.find(query).to_list(length=1000)
    return [RepairShop(**shop) for shop in shops]

@api_router.post("/repair-shops", response_model=RepairShop)
async def create_repair_shop(shop_data: RepairShop):
    """Create new repair shop"""
    await db.repair_shops.insert_one(shop_data.dict())
    return shop_data

# Admin/Stats Endpoints
@api_router.get("/admin/stats")
async def get_admin_stats(dealer_id: Optional[str] = None):
    """Get admin dashboard statistics"""
    query = {}
    if dealer_id:
        query["dealer_id"] = dealer_id
    
    # Get vehicle counts
    total_vehicles = await db.vehicles.count_documents(query)
    available_vehicles = await db.vehicles.count_documents({**query, "status": "Available"})
    sold_vehicles = await db.vehicles.count_documents({**query, "status": "Sold"})
    
    # Get leads counts
    total_leads = await db.leads.count_documents(query)
    new_leads = await db.leads.count_documents({**query, "status": "New"})
    
    # Get deals counts
    total_deals = await db.deals.count_documents(query)
    pending_deals = await db.deals.count_documents({**query, "status": "Pending"})
    
    # Calculate average vehicle price
    pipeline = [
        {"$match": query},
        {"$group": {"_id": None, "avg_price": {"$avg": "$price"}}}
    ]
    avg_price_result = await db.vehicles.aggregate(pipeline).to_list(length=1)
    avg_price = avg_price_result[0]["avg_price"] if avg_price_result else 0
    
    return {
        "vehicles": {
            "total": total_vehicles,
            "available": available_vehicles,
            "sold": sold_vehicles,
            "average_price": round(avg_price, 2) if avg_price else 0
        },
        "leads": {
            "total": total_leads,
            "new": new_leads
        },
        "deals": {
            "total": total_deals,
            "pending": pending_deals
        }
    }

# Health check
@api_router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.utcnow()}

# Include router
app.include_router(api_router)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)