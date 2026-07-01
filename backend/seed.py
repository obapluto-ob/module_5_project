from app import create_app, db
from app.models.models import User, Company, Job

app = create_app()

with app.app_context():
    
    Job.query.delete()
    Company.query.delete()
    User.query.delete()
    db.session.commit()


    employer = User(name="Admin Employer", email="employer@test.com", role="employer")
    employer.set_password("123456")
    db.session.add(employer)
    db.session.commit()


    companies = [
        Company(name="TechCorp", description="A leading tech company", website="https://techcorp.com", location="New York, NY", user_id=employer.id),
        Company(name="DesignHub", description="Creative design agency", website="https://designhub.com", location="San Francisco, CA", user_id=employer.id),
        Company(name="DataWorks", description="Data analytics firm", website="https://dataworks.com", location="Austin, TX", user_id=employer.id),
    ]
    db.session.add_all(companies)
    db.session.commit()


    jobs = [
        Job(title="Frontend Developer", description="Build beautiful React UIs", salary="$80,000 - $100,000", location="New York, NY", job_type="full-time", user_id=employer.id, company_id=companies[0].id),
        Job(title="Backend Engineer", description="Build scalable Flask APIs", salary="$90,000 - $110,000", location="Remote", job_type="remote", user_id=employer.id, company_id=companies[0].id),
        Job(title="UI/UX Designer", description="Design stunning user experiences", salary="$70,000 - $90,000", location="San Francisco, CA", job_type="full-time", user_id=employer.id, company_id=companies[1].id),
        Job(title="Data Analyst", description="Analyse and visualise data insights", salary="$75,000 - $95,000", location="Austin, TX", job_type="full-time", user_id=employer.id, company_id=companies[2].id),
        Job(title="DevOps Engineer", description="Manage CI/CD pipelines and infrastructure", salary="$100,000 - $120,000", location="Remote", job_type="remote", user_id=employer.id, company_id=companies[0].id),
        Job(title="Product Manager", description="Lead product strategy and roadmap", salary="$95,000 - $115,000", location="New York, NY", job_type="full-time", user_id=employer.id, company_id=companies[1].id),
    ]
    db.session.add_all(jobs)
    db.session.commit()

    print("Seed data added successfully!")
    print(f"Employer login: employer@test.com / 123456")
    print(f"Companies: {len(companies)}")
    print(f"Jobs: {len(jobs)}")
