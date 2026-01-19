import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_KEY environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Routes

// Create (POST /settings)
app.post('/settings', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('settings')
      .insert({ data: req.body })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read All (GET /settings) - Paged
app.get('/settings', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { data, count, error } = await supabase
      .from('settings')
      .select('*', { count: 'exact' })
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      data,
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read One (GET /settings/:uid)
app.get('/settings/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('uid', uid)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // JSON object not found
        return res.status(404).json({ error: 'Setting not found' });
      }
      throw error;
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update (PUT /settings/:uid)
app.put('/settings/:uid', async (req, res) => {
  try {
    const { uid } = req.params;

    // First check if it exists
    const { count, error: countError } = await supabase
      .from('settings')
      .select('*', { count: 'exact', head: true })
      .eq('uid', uid);

    if (countError) throw countError;
    if (count === 0) {
      return res.status(404).json({ error: 'Setting not found' });
    }

    const { data, error } = await supabase
      .from('settings')
      .update({ data: req.body })
      .eq('uid', uid)
      .select()
      .single();

    console.log("Data: ", data);
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete (DELETE /settings/:uid)
app.delete('/settings/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    const { error } = await supabase
      .from('settings')
      .delete()
      .eq('uid', uid);

    if (error) throw error;
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
