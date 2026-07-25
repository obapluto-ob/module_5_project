from app import create_app, db
from app.models.models import User, Company, Job

app = create_app()

with app.app_context():

    Job.query.delete()
    Company.query.delete()
    User.query.delete()
    db.session.commit()

    employer = User(name="Kamau Njoroge", email="employer@test.com", role="employer")
    employer.set_password("123456")
    db.session.add(employer)
    db.session.commit()

    companies = [
        Company(name="Safaricom PLC", description="Kampuni inayoongoza katika mawasiliano Kenya", website="https://safaricom.co.ke", location="Nairobi, Kenya", user_id=employer.id),
        Company(name="Andela Kenya", description="Teknolojia na mafunzo ya wasanidi programu", website="https://andela.com", location="Nairobi, Kenya", user_id=employer.id),
        Company(name="Cellulant", description="Malipo ya kidijitali Afrika", website="https://cellulant.io", location="Westlands, Nairobi", user_id=employer.id),
        Company(name="Twiga Foods", description="Usambazaji wa chakula kwa teknolojia", website="https://twigafoods.com", location="Industrial Area, Nairobi", user_id=employer.id),
    ]
    db.session.add_all(companies)
    db.session.commit()

    jobs = [
        Job(title="Frontend Developer", description="Jenga miunzi ya React kwa bidhaa zetu za kidijitali", salary="KES 80,000 - 120,000", location="Nairobi, Kenya", job_type="full-time", user_id=employer.id, company_id=companies[0].id),
        Job(title="Backend Engineer", description="Tengeneza API za Flask zinazoweza kukua", salary="KES 100,000 - 150,000", location="Remote", job_type="remote", user_id=employer.id, company_id=companies[0].id),
        Job(title="Data Analyst", description="Changanua data na kutoa ripoti za biashara", salary="KES 70,000 - 100,000", location="Nairobi, Kenya", job_type="full-time", user_id=employer.id, company_id=companies[2].id),
        Job(title="Mobile Developer", description="Tengeneza programu za simu kwa Android na iOS", salary="KES 90,000 - 130,000", location="Westlands, Nairobi", job_type="full-time", user_id=employer.id, company_id=companies[1].id),
        Job(title="DevOps Engineer", description="Simamia miundombinu na mifumo ya CI/CD", salary="KES 120,000 - 180,000", location="Remote", job_type="remote", user_id=employer.id, company_id=companies[0].id),
        Job(title="UI/UX Designer", description="Buni uzoefu mzuri wa mtumiaji kwa bidhaa zetu", salary="KES 60,000 - 90,000", location="Nairobi, Kenya", job_type="full-time", user_id=employer.id, company_id=companies[1].id),
        Job(title="Supply Chain Analyst", description="Boresha mnyororo wa usambazaji wa chakula", salary="KES 65,000 - 85,000", location="Industrial Area, Nairobi", job_type="full-time", user_id=employer.id, company_id=companies[3].id),
    ]
    db.session.add_all(jobs)
    db.session.commit()

    print("Data ya mbegu imeongezwa!")
    print(f"Ingia kama mwajiri: employer@test.com / 123456")
    print(f"Makampuni: {len(companies)}")
    print(f"Kazi: {len(jobs)}")
